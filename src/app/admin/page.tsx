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
  writeBatch,
} from "firebase/firestore";
import { CmsAdminModal } from "@/components/CmsAdminModal";
import { initialBlogPosts } from "@/data/blogData";
import { isAdminUser } from "@/lib/adminAuthorization";
import { auth, db } from "@/lib/firebase";
import { BlogPost } from "@/types";

function logArticleLoadError(
  error: unknown,
  operation: string,
  userUid: string,
) {
  if (process.env.NODE_ENV !== "development") {
    console.error("Could not load CMS articles from Firestore.");
    return;
  }

  console.error("[CMS] Firestore article operation failed", {
    operation,
    code: error instanceof FirebaseError ? error.code : "unknown",
    message: error instanceof Error ? error.message : String(error),
    userUid,
    projectId: db.app.options.projectId,
    collection: "articles",
  });
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
        logArticleLoadError(error, operation, user.uid);
        if (!cancelled) {
          setLoadError("Could not load CMS articles. Check Firestore rules and try again.");
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

  const handleUpdatePosts = async (nextPosts: BlogPost[]) => {
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

    if (hasChanges) await batch.commit();
    setPosts(nextPosts);
  };

  if (!authResolved || (authorized && articlesLoading)) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8F8F6] text-sm text-[#555555]">
        Checking admin access…
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
      onViewArticle={(post) => router.push(`/blog/${post.slug}`)}
    />
  );
}
