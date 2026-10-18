"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { CmsAdminModal } from "@/components/CmsAdminModal";
import { initialBlogPosts } from "@/data/blogData";
import { isAdminUser } from "@/lib/adminAuthorization";
import { auth, db } from "@/lib/firebase";
import { BlogImageUpdates } from "@/lib/blogImages";
import { BlogPost } from "@/types";

function logArticleLoadError(
  error: unknown,
  operation: string,
) {
  const code = error instanceof FirebaseError ? error.code : "unknown";
  const message = error instanceof Error ? error.message : String(error);
  const missingDatabase =
    /\bdatabase\b.*\bnot found\b/i.test(message) ||
    /\bnot found\b.*\bdatabase\b/i.test(message);
  const diagnosis = missingDatabase
    ? "database-not-found"
    : code === "permission-denied"
      ? "permission-denied"
      : code === "unavailable"
        ? "connection-unavailable"
        : "unclassified";

  console.error("[CMS] Firestore article operation failed", {
    operation,
    code,
    diagnosis,
    message,
    projectId: db.app.options.projectId,
    database: "(default)",
    collection: "articles",
  });
}

function getArticleLoadErrorMessage(error: unknown): string {
  const code = error instanceof FirebaseError ? error.code : "unknown";
  const message = error instanceof Error ? error.message : String(error);

  if (
    /\bdatabase\b.*\bnot found\b/i.test(message) ||
    /\bnot found\b.*\bdatabase\b/i.test(message)
  ) {
    return `Firestore database "(default)" was not found in Firebase project "${db.app.options.projectId}". Create the default Firestore database in this project; changing security rules will not fix a missing database.`;
  }

  if (code === "permission-denied") {
    return "Firestore rejected this read with a permissions error. Check the deployed Firestore rules and the authenticated admin UID.";
  }

  if (code === "unavailable") {
    return `Could not connect to Firestore in Firebase project "${db.app.options.projectId}". Check connectivity or browser request blocking, and verify that the default Firestore database exists.`;
  }

  return `Could not load CMS articles from Firestore in project "${db.app.options.projectId}". Check the browser console for the operation and error code.`;
}

export default function AdminPage() {
  const router = useRouter();
  const [authResolved, setAuthResolved] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);

  useEffect(() => {
    let cancelled = false;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user || !isAdminUser(user)) {
        setAuthorized(false);
        setAuthResolved(true);
        setArticlesLoading(false);
        if (user) {
          try {
            await signOut(auth);
          } catch (error) {
            console.error("Could not sign out the unauthorized account:", error);
          }
        }
        return;
      }

      setAuthorized(true);
      setAuthResolved(true);
      setArticlesLoading(true);
      setLoadError("");
      let operation = "verify authenticated admin session";

      try {
        const authenticatedUser = auth.currentUser;
        if (
          !authenticatedUser ||
          authenticatedUser.uid !== user.uid ||
          !isAdminUser(authenticatedUser)
        ) {
          throw new Error(
            "The current Firebase user does not match the authorized admin session.",
          );
        }

        await authenticatedUser.getIdToken();
        const refreshedUser = auth.currentUser;
        if (
          !refreshedUser ||
          refreshedUser.uid !== user.uid ||
          !isAdminUser(refreshedUser)
        ) {
          throw new Error(
            "The Firebase admin session changed before article loading.",
          );
        }

        operation = "read cmsMetadata/blog";
        const metadataRef = doc(db, "cmsMetadata", "blog");
        const metadata = await getDoc(metadataRef);
        operation = "list articles for authorized admin";
        let articles = await getDocs(collection(db, "articles"));

        if (metadata.data()?.initialized !== true) {
          operation = "initialize CMS articles and metadata";
          const batch = writeBatch(db);
          const existingIds = new Set(articles.docs.map((article) => article.id));

          initialBlogPosts.forEach((post) => {
            if (!existingIds.has(post.id)) {
              batch.set(doc(db, "articles", post.id), post);
            }
          });
          batch.set(metadataRef, { initialized: true });
          await batch.commit();
          operation = "reload articles for authorized admin";
          articles = await getDocs(collection(db, "articles"));
        }

        if (!cancelled) {
          setPosts(articles.docs.map((article) => article.data() as BlogPost));
        }
      } catch (error) {
        logArticleLoadError(error, operation);
        if (!cancelled) {
          setLoadError(getArticleLoadErrorMessage(error));
        }
      } finally {
        if (!cancelled) setArticlesLoading(false);
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const handleUpdatePosts = async (
    nextPosts: BlogPost[],
    imageUpdates?: BlogImageUpdates,
  ) => {
    if (!authorized || !isAdminUser(auth.currentUser)) {
      throw new Error("Only a configured Firebase admin can update articles.");
    }

    const previousPostsById = new Map(posts.map((post) => [post.id, post]));
    const nextPostIds = new Set(nextPosts.map((post) => post.id));
    const batch = writeBatch(db);
    let hasChanges = false;

    nextPosts.forEach((post) => {
      const previousPost = previousPostsById.get(post.id);
      if (JSON.stringify(previousPost) !== JSON.stringify(post)) {
        batch.set(doc(db, "articles", post.id), post);
        hasChanges = true;
      }
    });

    posts.forEach((post) => {
      if (!nextPostIds.has(post.id)) {
        batch.delete(doc(db, "articles", post.id));
        hasChanges = true;
      }
    });

    Object.entries(imageUpdates ?? {}).forEach(([articleId, image]) => {
      const imageRef = doc(db, "articleImages", articleId);
      if (image) {
        batch.set(imageRef, { ...image, updatedAt: serverTimestamp() });
      } else {
        batch.delete(imageRef);
      }
      hasChanges = true;
    });

    if (hasChanges) await batch.commit();
    setPosts(nextPosts);
  };

  if (!authResolved || (authorized && articlesLoading)) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8F8F6] text-sm text-[#555555]">
        {!authResolved ? "Checking admin access…" : "Loading CMS articles…"}
      </main>
    );
  }

  if (authorized && loadError) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F8F8F6] p-6 text-center">
        <p role="alert" className="text-sm text-red-600">
          {loadError}
        </p>
        <button
          type="button"
          onClick={() => router.replace("/")}
          className="text-sm text-[#666666] underline"
        >
          Return to the website
        </button>
      </main>
    );
  }

  return (
    <CmsAdminModal
      isOpen
      onClose={() => router.replace("/")}
      posts={posts}
      onUpdatePosts={handleUpdatePosts}
    />
  );
}
