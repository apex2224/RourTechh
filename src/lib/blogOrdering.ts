import type { BlogPost } from "@/types";

function getPublishedTime(post: BlogPost): number {
  const parsedDate = Date.parse(post.publishDate);
  return Number.isFinite(parsedDate) ? parsedDate : 0;
}

function getCreationTimeFromId(post: BlogPost): number {
  const match = /^post-(\d{13})$/.exec(post.id);
  return match ? Number(match[1]) : 0;
}

export function sortBlogPostsNewestFirst(posts: readonly BlogPost[]): BlogPost[] {
  return [...posts].sort((first, second) => {
    const dateDifference = getPublishedTime(second) - getPublishedTime(first);
    if (dateDifference !== 0) return dateDifference;

    return getCreationTimeFromId(second) - getCreationTimeFromId(first);
  });
}
