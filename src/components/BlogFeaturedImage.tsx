import React, { useEffect, useRef, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import {
  getFirestoreBlogImageId,
  loadFirestoreBlogImage,
} from "@/lib/blogImages";

interface BlogFeaturedImageProps {
  readonly imageUrl?: string | null;
  readonly alt: string;
  readonly className: string;
  readonly imageClassName?: string;
}

export const BlogFeaturedImage: React.FC<BlogFeaturedImageProps> = ({
  imageUrl,
  alt,
  className,
  imageClassName = "h-full w-full object-cover",
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [resolvedImageUrl, setResolvedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const firestoreImageId = imageUrl
    ? getFirestoreBlogImageId(imageUrl)
    : null;

  useEffect(() => {
    setImageFailed(false);
    setResolvedImageUrl(null);

    if (!imageUrl) {
      setIsLoading(false);
      return;
    }

    if (!firestoreImageId) {
      setResolvedImageUrl(imageUrl);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    setIsLoading(true);

    const loadImage = async () => {
      try {
        const dataUrl = await loadFirestoreBlogImage(firestoreImageId);
        if (!cancelled) {
          setResolvedImageUrl(dataUrl);
          setImageFailed(!dataUrl);
        }
      } catch (error) {
        console.error("Could not load the Firestore-backed blog image:", error);
        if (!cancelled) setImageFailed(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    if (typeof IntersectionObserver === "undefined" || !containerRef.current) {
      void loadImage();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            void loadImage();
          }
        },
        { rootMargin: "300px" },
      );
      observer.observe(containerRef.current);
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [imageUrl, firestoreImageId]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden bg-[#ECECE8] ${className}`}
    >
      {resolvedImageUrl && !imageFailed ? (
        <img
          src={resolvedImageUrl}
          alt={alt}
          className={imageClassName}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div
          className="flex flex-col items-center gap-2 px-4 text-center text-xs text-[#777777]"
          role="img"
          aria-label={
            isLoading
              ? "Loading featured image"
              : imageUrl
                ? "Featured image unavailable"
                : "No featured image added"
          }
        >
          <ImageIcon className="h-6 w-6 text-[#999999]" aria-hidden="true" />
          <span>
            {isLoading
              ? "Loading featured image…"
              : imageUrl
                ? "Featured image unavailable"
                : "No featured image added"}
          </span>
        </div>
      )}
    </div>
  );
};
