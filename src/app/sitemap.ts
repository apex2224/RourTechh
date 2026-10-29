import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "@/lib/siteConfig";

export const revalidate = 3600;

const STATIC_CONTENT_LAST_MODIFIED = "2026-10-29";
const PUBLISHED_POSTS_LIMIT = 1000;

type FirestoreField = {
  stringValue?: unknown;
};

async function listPublishedBlogPosts(): Promise<
  Array<{ slug: string; lastModified?: string }>
> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();

  if (!projectId) {
    console.error(
      "Missing NEXT_PUBLIC_FIREBASE_PROJECT_ID for the blog sitemap.",
    );
    return [];
  }

  const endpoint = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(
    projectId,
  )}/databases/default/documents:runQuery`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: "articles" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "status" },
              op: "EQUAL",
              value: { stringValue: "published" },
            },
          },
          select: {
            fields: [{ fieldPath: "slug" }, { fieldPath: "publishDate" }],
          },
          limit: PUBLISHED_POSTS_LIMIT,
        },
      }),
    });

    if (!response.ok) {
      console.error(
        `Firestore blog sitemap lookup failed (${response.status}): ${await response.text()}`,
      );
      return [];
    }

    const rows = (await response.json()) as Array<{
      document?: {
        fields?: Record<string, FirestoreField>;
        updateTime?: string;
      };
    }>;

    return rows.flatMap((row) => {
      const fields = row.document?.fields;
      const slug = fields?.slug?.stringValue;
      const publishDate = fields?.publishDate?.stringValue;

      if (
        typeof slug !== "string" ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
      ) {
        return [];
      }

      const updateTimestamp =
        typeof row.document?.updateTime === "string"
          ? Date.parse(row.document.updateTime)
          : NaN;
      const publishTimestamp =
        typeof publishDate === "string" ? Date.parse(publishDate) : NaN;
      const lastModified = Number.isFinite(updateTimestamp)
        ? new Date(updateTimestamp).toISOString()
        : Number.isFinite(publishTimestamp)
          ? new Date(publishTimestamp).toISOString().slice(0, 10)
          : STATIC_CONTENT_LAST_MODIFIED;

      return [{ slug, lastModified }];
    });
  } catch (error) {
    console.error("Firestore blog sitemap lookup failed:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceRoutes = [
    "web-development",
    "ui-ux-design",
    "technical-seo",
    "ecommerce-development",
    "custom-software",
    "maintenance-security",
  ].map((slug) => ({
    url: absoluteSiteUrl(`/services/${slug}`),
    lastModified: STATIC_CONTENT_LAST_MODIFIED,
  }));

  const companyRoutes = [
    "about",
    "contact",
    "faq",
    "blog",
    "resources",
    "portfolio",
  ].map((route) => ({
    url: absoluteSiteUrl(`/${route}`),
    lastModified: STATIC_CONTENT_LAST_MODIFIED,
  }));

  const legalRoutes = [
    "privacy-policy",
    "cookie-policy",
    "terms-and-conditions",
    "disclaimer",
    "data-deletion",
    "acceptable-use-policy",
    "refund-policy",
    "shipping-policy",
  ].map((route) => ({
    url: absoluteSiteUrl(`/${route}`),
    lastModified: STATIC_CONTENT_LAST_MODIFIED,
  }));

  const blogPostRoutes = (await listPublishedBlogPosts()).map(
    ({ slug, lastModified }) => ({
      url: absoluteSiteUrl(`/blog/${slug}`),
      ...(lastModified ? { lastModified } : {}),
    }),
  );

  return [
    {
      url: absoluteSiteUrl(),
      lastModified: STATIC_CONTENT_LAST_MODIFIED,
    },
    ...serviceRoutes,
    ...companyRoutes,
    ...legalRoutes,
    ...blogPostRoutes,
  ];
}
