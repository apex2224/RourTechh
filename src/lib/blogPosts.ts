import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { BlogPost } from "@/types";
import { db } from "@/lib/firebase";

function isExpectedAbort(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const candidate = error as { name?: unknown; message?: unknown };
  const name = typeof candidate.name === "string" ? candidate.name : "";
  const message =
    typeof candidate.message === "string" ? candidate.message : "";

  return name === "AbortError" || /signal is aborted/i.test(message);
}

export async function loadPublishedBlogPosts(): Promise<BlogPost[] | null> {
  try {
    const metadata = await getDoc(doc(db, "cmsMetadata", "blog"));
    if (metadata.data()?.initialized !== true) return null;

    const publishedArticles = await getDocs(
      query(collection(db, "articles"), where("status", "==", "published")),
    );

    return publishedArticles.docs.map((article) => article.data() as BlogPost);
  } catch (error) {
    if (isExpectedAbort(error)) return null;
    throw error;
  }
}
