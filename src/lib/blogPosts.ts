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

export async function loadPublishedBlogPosts(): Promise<BlogPost[] | null> {
  const metadata = await getDoc(doc(db, "cmsMetadata", "blog"));
  if (metadata.data()?.initialized !== true) return null;

  const publishedArticles = await getDocs(
    query(collection(db, "articles"), where("status", "==", "published")),
  );

  return publishedArticles.docs.map((article) => article.data() as BlogPost);
}
