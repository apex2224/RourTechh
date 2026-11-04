import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import {
  getFirestoreBlogImageId,
  loadFirestoreBlogImage,
} from "@/lib/blogImages";

const FALLBACK_IMAGE =
  "/src/assets/images/hero_digital_agency_1791271576191-optimized.webp";

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
  const firestoreImageId = imageUrl ? getFirestoreBlogImageId(imageUrl) : null;
  const initialImageUrl =
    imageUrl && !firestoreImageId ? imageUrl : FALLBACK_IMAGE;
  const [resolvedImageUrl, setResolvedImageUrl] =
    useState<string>(initialImageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isRemoteImage =
    resolvedImageUrl.startsWith("https://") ||
    resolvedImageUrl.startsWith("http://");

  useEffect(() => {
    setImageFailed(false);

    if (!imageUrl) {
      setResolvedImageUrl(FALLBACK_IMAGE);
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
          setResolvedImageUrl(dataUrl || FALLBACK_IMAGE);
        }
      } catch (error) {
        console.error("Could not load the Firestore-backed blog image:", error);
        if (!cancelled) setResolvedImageUrl(FALLBACK_IMAGE);
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
        isRemoteImage ? (
          <img
            src={resolvedImageUrl}
            alt={alt}
            className={imageClassName}
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
            onError={() => {
              if (resolvedImageUrl !== FALLBACK_IMAGE) {
                setResolvedImageUrl(FALLBACK_IMAGE);
              } else {
                setImageFailed(true);
              }
            }}
          />
        ) : (
          <Image
            src={resolvedImageUrl}
            alt={alt}
            className={imageClassName}
            fill={false}
            width={1600}
            height={900}
            loading="lazy"
            unoptimized={resolvedImageUrl.startsWith("data:")}
            onError={() => {
              if (resolvedImageUrl !== FALLBACK_IMAGE) {
                setResolvedImageUrl(FALLBACK_IMAGE);
              } else {
                setImageFailed(true);
              }
            }}
          />
        )
      ) : (
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center text-xs text-[#777777] ${isLoading ? "skeleton" : ""}`}
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
