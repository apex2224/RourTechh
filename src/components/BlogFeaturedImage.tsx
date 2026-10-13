import React, { useEffect, useState } from "react";
import { Image as ImageIcon } from "lucide-react";

interface BlogFeaturedImageProps {
  imageUrl?: string | null;
  alt: string;
  className: string;
  imageClassName?: string;
}

export const BlogFeaturedImage: React.FC<BlogFeaturedImageProps> = ({
  imageUrl,
  alt,
  className,
  imageClassName = "h-full w-full object-cover",
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [imageUrl]);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-[#ECECE8] ${className}`}
    >
      {imageUrl && !imageFailed ? (
        <img
          src={imageUrl}
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
            imageUrl ? "Featured image unavailable" : "No featured image added"
          }
        >
          <ImageIcon className="h-6 w-6 text-[#999999]" aria-hidden="true" />
          <span>
            {imageUrl ? "Featured image unavailable" : "No featured image added"}
          </span>
        </div>
      )}
    </div>
  );
};
