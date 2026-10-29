import { BlogPost } from "@/types";

const DATABASE_ID = "default";
const PUBLISHED_POSTS_LIMIT = 1000;

type FirestoreValue = Record<string, unknown>;

function decodeFirestoreValue(value: FirestoreValue): unknown {
    if ("stringValue" in value) return value.stringValue;
    if ("booleanValue" in value) return value.booleanValue;
    if ("integerValue" in value) return Number(value.integerValue);
    if ("doubleValue" in value) return value.doubleValue;
    if ("timestampValue" in value) return value.timestampValue;
    if ("nullValue" in value) return null;

    if ("arrayValue" in value) {
        const arrayValue = value.arrayValue as { values?: FirestoreValue[] };
        return (arrayValue.values ?? []).map(decodeFirestoreValue);
    }

    if ("mapValue" in value) {
        const mapValue = value.mapValue as {
            fields?: Record<string, FirestoreValue>;
        };

        return decodeFirestoreFields(mapValue.fields ?? {});
    }

    return undefined;
}

function decodeFirestoreFields(
    fields: Record<string, FirestoreValue>,
): Record<string, unknown> {
    return Object.fromEntries(
        Object.entries(fields).map(([key, value]) => [
            key,
            decodeFirestoreValue(value),
        ]),
    );
}

function normalizeBlogPost(
    value: unknown,
    documentId: string,
): BlogPost | null {
    if (!value || typeof value !== "object") return null;

    const data = value as Record<string, unknown>;

    if (
        typeof data.title !== "string" ||
        typeof data.slug !== "string" ||
        typeof data.content !== "string" ||
        data.status !== "published"
    ) {
        return null;
    }

    const author =
        data.author && typeof data.author === "object"
            ? (data.author as Record<string, unknown>)
            : {};

    return {
        ...(data as Partial<BlogPost>),
        id: typeof data.id === "string" && data.id ? data.id : documentId,
        title: data.title,
        slug: data.slug,
        content: data.content,
        seoTitle: typeof data.seoTitle === "string" ? data.seoTitle : data.title,
        seoDescription:
            typeof data.seoDescription === "string" ? data.seoDescription : "",
        tags: Array.isArray(data.tags)
            ? data.tags.filter((tag): tag is string => typeof tag === "string")
            : [],
        author: {
            name:
                typeof author.name === "string"
                    ? author.name
                    : "RouR Tech Editorial Team",
            role: typeof author.role === "string" ? author.role : "",
            avatar: typeof author.avatar === "string" ? author.avatar : "",
        },
        featuredImage:
            typeof data.featuredImage === "string" ? data.featuredImage : "",
        category:
            data.category === "UI/UX" ||
                data.category === "SEO" ||
                data.category === "Technology" ||
                data.category === "E-commerce"
                ? data.category
                : "Web Development",
        publishDate: typeof data.publishDate === "string" ? data.publishDate : "",
        readTime: typeof data.readTime === "string" ? data.readTime : "",
        excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
        status: "published",
    };
}

export async function listPublishedBlogPostSlugs(): Promise<string[]> {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();

    if (!projectId) {
        console.error(
            "Missing NEXT_PUBLIC_FIREBASE_PROJECT_ID for the blog sitemap.",
        );
        return [];
    }

    const endpoint = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(
        projectId,
    )}/databases/${encodeURIComponent(
        DATABASE_ID,
    )}/documents:runQuery`;

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
            document?: { fields?: Record<string, FirestoreValue> };
        }>;

        return rows.flatMap((row) => {
            const slugValue = row.document?.fields?.slug;
            const slug =
                slugValue && "stringValue" in slugValue
                    ? slugValue.stringValue
                    : undefined;

            return typeof slug === "string" &&
                /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
                ? [slug]
                : [];
        });
    } catch (error) {
        console.error("Firestore blog sitemap lookup failed:", error);
        return [];
    }
}

export async function loadPublishedBlogPostBySlug(
    slug: string,
): Promise<BlogPost | null> {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();

    if (!projectId) {
        console.error(
            "Missing NEXT_PUBLIC_FIREBASE_PROJECT_ID for server blog rendering.",
        );
        return null;
    }

    const endpoint = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(
        projectId,
    )}/databases/${encodeURIComponent(
        DATABASE_ID,
    )}/documents:runQuery`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
            body: JSON.stringify({
                structuredQuery: {
                    from: [{ collectionId: "articles" }],
                    where: {
                        compositeFilter: {
                            op: "AND",
                            filters: [
                                {
                                    fieldFilter: {
                                        field: { fieldPath: "slug" },
                                        op: "EQUAL",
                                        value: { stringValue: slug },
                                    },
                                },
                                {
                                    fieldFilter: {
                                        field: { fieldPath: "status" },
                                        op: "EQUAL",
                                        value: { stringValue: "published" },
                                    },
                                },
                            ],
                        },
                    },
                    limit: 1,
                },
            }),
        });

        if (!response.ok) {
            console.error(
                `Firestore article lookup failed (${response.status}): ${await response.text()}`,
            );
            return null;
        }

        const rows = (await response.json()) as Array<{
            document?: {
                name?: string;
                fields?: Record<string, FirestoreValue>;
            };
        }>;

        const document = rows.find((row) => row.document)?.document;
        if (!document) return null;

        const documentId = document.name?.split("/").pop() ?? "";
        const fields = decodeFirestoreFields(document.fields ?? {});

        return normalizeBlogPost(fields, documentId);
    } catch (error) {
        console.error("Firestore article lookup failed:", error);
        return null;
    }
}