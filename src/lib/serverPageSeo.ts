import type { Metadata } from "next";
import {
  PageSeoSettings,
  emptyPageSeoSettings,
} from "@/lib/pageSeoConfig";

type FirestoreValue = {
  stringValue?: unknown;
};

function readStringField(
  fields: Record<string, FirestoreValue> | undefined,
  key: keyof PageSeoSettings,
): string {
  const value = fields?.[key]?.stringValue;
  return typeof value === "string" ? value : "";
}

export async function getPageSeo(
  pageId: string,
): Promise<PageSeoSettings | null> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();
  if (!projectId) {
    console.error("Missing Firebase project ID while loading page SEO.", {
      pageId,
    });
    return null;
  }

  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(
    projectId,
  )}/databases/default/documents/sitePageSeo/${encodeURIComponent(pageId)}`;

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (response.status === 404) return null;
    if (!response.ok) {
      console.error("Could not load page SEO settings from Firestore.", {
        pageId,
        status: response.status,
        response: await response.text(),
      });
      return null;
    }

    const document = (await response.json()) as {
      fields?: Record<string, FirestoreValue>;
    };
    const fields = document.fields;

    return {
      h1: readStringField(fields, "h1"),
      seoTitle: readStringField(fields, "seoTitle"),
      metaDescription: readStringField(fields, "metaDescription"),
      focusKeyword: readStringField(fields, "focusKeyword"),
      socialTitle: readStringField(fields, "socialTitle"),
      socialDescription: readStringField(fields, "socialDescription"),
    };
  } catch (error) {
    console.error("Page SEO lookup failed.", { pageId, error });
    return null;
  }
}

export function withPageSeo(
  defaults: Metadata,
  settings: PageSeoSettings | null,
): Metadata {
  if (!settings) return defaults;

  const seoTitle = settings.seoTitle.trim();
  const metaDescription = settings.metaDescription.trim();
  const socialTitle = settings.socialTitle.trim() || seoTitle;
  const socialDescription = settings.socialDescription.trim() || metaDescription;
  const title =
    seoTitle ||
    (typeof defaults.title === "string" ? defaults.title : undefined);
  const description = metaDescription || defaults.description;
  const shouldSetOpenGraph =
    Boolean(defaults.openGraph) || Boolean(socialTitle || socialDescription);
  const shouldSetTwitter =
    Boolean(defaults.twitter) || Boolean(socialTitle || socialDescription);

  return {
    ...defaults,
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(shouldSetOpenGraph
      ? {
          openGraph: {
            ...(defaults.openGraph ?? {}),
            ...(socialTitle ? { title: socialTitle } : {}),
            ...(socialDescription ? { description: socialDescription } : {}),
          },
        }
      : {}),
    ...(shouldSetTwitter
      ? {
          twitter: {
            ...(defaults.twitter ?? {}),
            ...(socialTitle ? { title: socialTitle } : {}),
            ...(socialDescription ? { description: socialDescription } : {}),
          },
        }
      : {}),
  };
}

export async function getPageMetadata(
  pageId: string,
  defaults: Metadata,
): Promise<Metadata> {
  return withPageSeo(defaults, await getPageSeo(pageId));
}

export function getPageH1(
  settings: PageSeoSettings | null,
  fallback: string,
): string {
  return settings?.h1.trim() || fallback;
}

export function pageSeoFormValue(
  settings: Partial<PageSeoSettings> | undefined,
): PageSeoSettings {
  return { ...emptyPageSeoSettings, ...settings };
}
