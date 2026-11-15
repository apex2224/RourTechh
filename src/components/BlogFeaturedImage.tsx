import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
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

interface ImageState {
  source: string | null;
  resolvedUrl: string | null;
  status: "loading" | "loaded" | "error";
}

function getInitialImageState(imageUrl?: string | null): ImageState {
  const source = imageUrl || null;
  const isFirestoreImage = source ? getFirestoreBlogImageId(source) : null;

  return {
    source,
    resolvedUrl: source && !isFirestoreImage ? source : null,
    status: source ? "loading" : "error",
  };
}

export const BlogFeaturedImage: React.FC<BlogFeaturedImageProps> = ({
  imageUrl,
  alt,
  className,
  imageClassName = "h-full w-full object-cover",
}) => {
  const source = imageUrl || null;
  const firestoreImageId = source ? getFirestoreBlogImageId(source) : null;
  const [imageState, setImageState] = useState<ImageState>(() =>
    getInitialImageState(imageUrl),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const isCurrentSource = imageState.source === source;
  const resolvedImageUrl = isCurrentSource ? imageState.resolvedUrl : null;
  const isImageLoading =
    Boolean(source) && (!isCurrentSource || imageState.status === "loading");
  const imageFailed =
    !source || (isCurrentSource && imageState.status === "error");
  const isRemoteImage =
    resolvedImageUrl?.startsWith("https://") ||
    resolvedImageUrl?.startsWith("http://");

  useEffect(() => {
    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    setImageState({
      source,
      resolvedUrl: source && !firestoreImageId ? source : null,
      status: source ? "loading" : "error",
    });

    if (!source || !firestoreImageId) {
      return () => {
        cancelled = true;
      };
    }

    const loadImage = async () => {
      try {
        const dataUrl = await loadFirestoreBlogImage(firestoreImageId);
        if (cancelled) return;

        setImageState({
          source,
          resolvedUrl: dataUrl,
          status: dataUrl ? "loading" : "error",
        });
      } catch (error) {
        console.error("Could not load the Firestore-backed blog image:", error);
        if (!cancelled) {
          setImageState({ source, resolvedUrl: null, status: "error" });
        }
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
  }, [source, firestoreImageId]);

  const handleImageLoad = () => {
    setImageState((current) =>
      current.source === source
        ? { ...current, status: "loaded" }
        : current,
    );
  };
  const handleImageError = () => {
    setImageState((current) =>
      current.source === source
        ? { ...current, resolvedUrl: null, status: "error" }
        : current,
    );
  };

  return (
    <div
      ref={containerRef}
      aria-busy={isImageLoading}
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
            onLoad={handleImageLoad}
            onError={handleImageError}
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
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )
      ) : null}
      {isImageLoading && (
        <div
          className="skeleton absolute inset-0 z-10"
          role="status"
          aria-label={`Loading image: ${alt}`}
        />
      )}
      {imageFailed && (
        <div
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center text-xs text-[#777777]"
          role="img"
          aria-label={`Featured image unavailable: ${alt}`}
        >
          <ImageIcon className="h-6 w-6 text-[#999999]" aria-hidden="true" />
          <span>Image unavailable</span>
        </div>
      )}
    </div>
  );
};
