import type { JSONContent } from "@tiptap/core";

interface HeadingIdInput {
  text: string;
  id: unknown;
  generated: unknown;
}

interface HeadingIdResult {
  id: string;
  generated: boolean;
}

const EMPTY_ANCHOR_PATTERN =
  /<a\b[^>]*\bid\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s"'<>]+))[^>]*>\s*<\/a\s*>/gi;
const EMPTY_ANCHOR_BEFORE_HEADING_PATTERN =
  /<a\b[^>]*\bid\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s"'<>]+))[^>]*>\s*<\/a\s*>\s*(<h([23])\b[^>]*)(>)/gi;
const ANCHOR_MARKER_PATTERN = /ROURTECHHEADINGANCHOR(\d+)END/g;

function isValidHeadingId(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && !/\s/.test(value);
}

function addAnchorMarker(
  id: string,
  anchorIds: Map<string, string>,
  source: string,
): string {
  const cleanId = id.trim();
  if (!isValidHeadingId(cleanId)) return "";

  let index = anchorIds.size;
  let marker = `ROURTECHHEADINGANCHOR${index}END`;
  while (source.includes(marker) || anchorIds.has(marker)) {
    index += 1;
    marker = `ROURTECHHEADINGANCHOR${index}END`;
  }
  anchorIds.set(marker, cleanId);
  return marker;
}

export function markMarkdownHeadingAnchors(markdown: string): {
  markdown: string;
  anchorIds: Map<string, string>;
} {
  const anchorIds = new Map<string, string>();
  const protectedMarkdown = markdown.split(
    /(```[\s\S]*?```|~~~[\s\S]*?~~~|`+[^`]*`+)/g,
  );
  const markedMarkdown = protectedMarkdown
    .map((segment) => {
      if (/^(?:```|~~~|`)/.test(segment)) return segment;
      return segment.replace(
        EMPTY_ANCHOR_PATTERN,
        (anchor, doubleQuotedId: string, singleQuotedId: string, unquotedId: string) => {
          const marker = addAnchorMarker(
            doubleQuotedId || singleQuotedId || unquotedId,
            anchorIds,
            markdown,
          );
          return marker ? `\n${marker}\n` : "";
        },
      );
    })
    .join("");
  return { markdown: markedMarkdown, anchorIds };
}

export function normalizeHtmlHeadingAnchors(html: string): string {
  const normalized = html.replace(
    EMPTY_ANCHOR_BEFORE_HEADING_PATTERN,
    (
      _anchor,
      doubleQuotedId: string,
      singleQuotedId: string,
      unquotedId: string,
      headingStart: string,
      _level: string,
      closingBracket: string,
    ) => {
      const id = (doubleQuotedId || singleQuotedId || unquotedId).trim();
      if (/\bid\s*=/i.test(headingStart) || !isValidHeadingId(id)) {
        return `${headingStart}${closingBracket}`;
      }
      const escapedId = id.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
      return `${headingStart} id="${escapedId}"${closingBracket}`;
    },
  );
  return normalized.replace(EMPTY_ANCHOR_PATTERN, "");
}

export function normalizeHeadingAnchors(
  document: JSONContent,
  existingAnchorIds = new Map<string, string>(),
): JSONContent {
  const anchorIds = new Map(existingAnchorIds);

  const markRawAnchors = (node: JSONContent): JSONContent => {
    if (node.type === "text" && typeof node.text === "string") {
      if (node.marks?.some((mark) => mark.type === "code")) return node;
      const text = node.text.replace(
        EMPTY_ANCHOR_PATTERN,
        (anchor, doubleQuotedId: string, singleQuotedId: string, unquotedId: string) =>
          addAnchorMarker(
            doubleQuotedId || singleQuotedId || unquotedId,
            anchorIds,
            node.text ?? anchor,
          ),
      );
      return text === node.text ? node : { ...node, text };
    }
    if (node.type === "codeBlock") return node;

    const content = node.content?.map(markRawAnchors);
    if (
      content === undefined ||
      content.every((child, index) => child === node.content?.[index])
    ) {
      return node;
    }
    return { ...node, content };
  };

  const markedDocument = markRawAnchors(document);
  const pendingIds: string[] = [];

  const applyMarkers = (node: JSONContent): JSONContent | null => {
    if (node.type === "text" && typeof node.text === "string") {
      let foundMarker = false;
      const text = node.text.replace(ANCHOR_MARKER_PATTERN, (marker, indexText: string) => {
        foundMarker = true;
        const id = anchorIds.get(marker);
        if (id) pendingIds.push(id);
        return "";
      });
      if (!text && foundMarker) return null;
      return foundMarker ? { ...node, text } : node;
    }

    let nodeChanged = false;
    const content = node.content?.flatMap((child) => {
      const normalized = applyMarkers(child);
      if (normalized !== child) nodeChanged = true;
      return normalized ? [normalized] : [];
    });

    let attrs = node.attrs;
    if (
      node.type === "heading" &&
      (node.attrs?.level === 2 || node.attrs?.level === 3) &&
      pendingIds.length > 0
    ) {
      const anchorId = pendingIds.shift();
      if (
        anchorId &&
        (typeof node.attrs?.id !== "string" || node.attrs.idGenerated === true)
      ) {
        attrs = { ...node.attrs, id: anchorId, idGenerated: false };
        nodeChanged = true;
      }
    }

    if (
      node.type === "paragraph" &&
      nodeChanged &&
      (!content || content.length === 0)
    ) {
      return null;
    }
    if (!nodeChanged) return node;
    return {
      ...node,
      ...(attrs ? { attrs } : {}),
      ...(content ? { content } : {}),
    };
  };

  return applyMarkers(markedDocument) ?? markedDocument;
}

function slugifyHeading(value: string): string {
  return (
    value
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

function makeUniqueId(base: string, usedIds: Set<string>): string {
  let candidate = base;
  let suffix = 2;
  while (usedIds.has(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  usedIds.add(candidate);
  return candidate;
}

export function assignHeadingIds(
  headings: readonly HeadingIdInput[],
): HeadingIdResult[] {
  const assigned: Array<HeadingIdResult | undefined> = headings.map(() => undefined);
  const usedIds = new Set<string>();

  headings.forEach((heading, index) => {
    if (
      heading.generated !== true &&
      isValidHeadingId(heading.id) &&
      !usedIds.has(heading.id)
    ) {
      usedIds.add(heading.id);
      assigned[index] = { id: heading.id, generated: false };
    }
  });

  headings.forEach((heading, index) => {
    if (
      assigned[index] === undefined &&
      heading.generated === true &&
      isValidHeadingId(heading.id) &&
      !usedIds.has(heading.id)
    ) {
      usedIds.add(heading.id);
      assigned[index] = { id: heading.id, generated: true };
    }
  });

  return headings.map((heading, index) => {
    const existing = assigned[index];
    if (existing) return existing;

    const base =
      isValidHeadingId(heading.id)
        ? slugifyHeading(heading.id)
        : slugifyHeading(heading.text);
    return { id: makeUniqueId(base, usedIds), generated: true };
  });
}

export function ensureHeadingIds(document: JSONContent): JSONContent {
  const headings: JSONContent[] = [];

  const collectHeadings = (node: JSONContent) => {
    if (
      node.type === "heading" &&
      (node.attrs?.level === 2 || node.attrs?.level === 3)
    ) {
      headings.push(node);
    }
    node.content?.forEach(collectHeadings);
  };
  collectHeadings(document);

  const ids = assignHeadingIds(
    headings.map((node) => ({
      text: getNodeText(node),
      id: node.attrs?.id,
      generated: node.attrs?.idGenerated,
    })),
  );
  const assignedIds = new Map(headings.map((node, index) => [node, ids[index]]));

  const applyIds = (node: JSONContent): JSONContent => {
    const content = node.content?.map(applyIds);
    const assignment = assignedIds.get(node);
    const attrs = assignment
      ? { ...node.attrs, id: assignment.id, idGenerated: assignment.generated }
      : node.attrs;
    const contentChanged =
      content !== undefined &&
      content.some((child, index) => child !== node.content?.[index]);
    const attrsChanged =
      assignment !== undefined &&
      (node.attrs?.id !== assignment.id ||
        node.attrs?.idGenerated !== assignment.generated);

    if (!contentChanged && !attrsChanged) return node;
    return {
      ...node,
      ...(attrs ? { attrs } : {}),
      ...(content ? { content } : {}),
    };
  };

  return applyIds(document);
}

function getNodeText(node: JSONContent): string {
  if (typeof node.text === "string") return node.text;
  return (node.content ?? []).map(getNodeText).join("");
}
