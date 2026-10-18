import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const BLOG_IMAGE_MAX_BYTES = 600 * 1024;
export const BLOG_IMAGE_MAX_BASE64_CHARACTERS =
  Math.ceil(BLOG_IMAGE_MAX_BYTES / 3) * 4;
export const FIRESTORE_BLOG_IMAGE_PREFIX = "firestore-image:";
export const BLOG_IMAGE_CONTENT_TYPE = "image/webp";

export interface PreparedBlogImage {
  imageData: string;
  contentType: typeof BLOG_IMAGE_CONTENT_TYPE;
  byteLength: number;
}

export type BlogImageUpdates = Record<string, PreparedBlogImage | null>;

export function getFirestoreBlogImageId(imageUrl: string): string | null {
  if (!imageUrl.startsWith(FIRESTORE_BLOG_IMAGE_PREFIX)) return null;

  const imageId = imageUrl.slice(FIRESTORE_BLOG_IMAGE_PREFIX.length);
  return /^[A-Za-z0-9_-]{1,128}$/.test(imageId) ? imageId : null;
}

export function getFirestoreBlogImageUrl(imageId: string): string {
  return `${FIRESTORE_BLOG_IMAGE_PREFIX}${imageId}`;
}

export async function loadFirestoreBlogImage(
  imageId: string,
): Promise<string | null> {
  const imageSnapshot = await getDoc(doc(db, "articleImages", imageId));
  if (!imageSnapshot.exists()) return null;

  const image = imageSnapshot.data();
  if (
    image.contentType !== BLOG_IMAGE_CONTENT_TYPE ||
    typeof image.imageData !== "string" ||
    image.imageData.length > BLOG_IMAGE_MAX_BASE64_CHARACTERS ||
    !Number.isInteger(image.byteLength) ||
    image.byteLength <= 0 ||
    image.byteLength > BLOG_IMAGE_MAX_BYTES
  ) {
    throw new Error(`Stored blog image "${imageId}" has an invalid format.`);
  }

  return `data:${BLOG_IMAGE_CONTENT_TYPE};base64,${image.imageData}`;
}

export async function prepareBlogImage(
  file: File,
): Promise<PreparedBlogImage> {
  const bitmap = await createImageBitmap(file);

  try {
    const maxDimension = 1600;
    const baseScale = Math.min(
      1,
      maxDimension / bitmap.width,
      maxDimension / bitmap.height,
    );
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not prepare the selected image.");

    for (const scale of [baseScale, baseScale * 0.8, baseScale * 0.64]) {
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

      for (const quality of [0.82, 0.68]) {
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (result) => {
              if (result) resolve(result);
              else reject(new Error("Could not encode the selected image."));
            },
            BLOG_IMAGE_CONTENT_TYPE,
            quality,
          );
        });

        if (blob.type !== BLOG_IMAGE_CONTENT_TYPE) {
          throw new Error("This browser cannot encode images as WebP.");
        }
        if (blob.size > BLOG_IMAGE_MAX_BYTES) continue;

        const imageData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result !== "string") {
              reject(new Error("Could not read the optimized image."));
              return;
            }

            const prefix = `data:${BLOG_IMAGE_CONTENT_TYPE};base64,`;
            if (!reader.result.startsWith(prefix)) {
              reject(new Error("The optimized image has an invalid format."));
              return;
            }
            resolve(reader.result.slice(prefix.length));
          };
          reader.onerror = () =>
            reject(reader.error ?? new Error("Could not read the image."));
          reader.readAsDataURL(blob);
        });

        return {
          imageData,
          contentType: BLOG_IMAGE_CONTENT_TYPE,
          byteLength: blob.size,
        };
      }
    }

    throw new Error(
      "The optimized image is still too large for the blog database. Choose a smaller image.",
    );
  } finally {
    bitmap.close();
  }
}
