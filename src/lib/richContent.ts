import {
  type Extensions,
  type JSONContent,
} from "@tiptap/core";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import { MarkdownManager } from "@tiptap/markdown";
import { common, createLowlight } from "lowlight";
import StarterKit from "@tiptap/starter-kit";
import { TableKit } from "@tiptap/extension-table";

export const lowlight = createLowlight(common);

export const richTextExtensions: Extensions = [
  StarterKit.configure({
    codeBlock: false,
    link: {
      openOnClick: false,
      HTMLAttributes: { rel: "noopener noreferrer" },
    },
  }),
  CodeBlockLowlight.configure({ lowlight }),
  Image.configure({ allowBase64: false }),
  TableKit.configure({
    table: {
      resizable: true,
    },
  }),
];

const markdownManager = new MarkdownManager({
  extensions: richTextExtensions,
});

export function createEmptyRichDocument(): JSONContent {
  return {
    type: "doc",
    content: [{ type: "paragraph" }],
  };
}

export function markdownToRichDocument(markdown: string): JSONContent {
  return markdownManager.parse(markdown);
}

export function isRichDocument(value: unknown): value is JSONContent {
  if (!value || typeof value !== "object") return false;

  const isNode = (node: unknown): boolean => {
    if (!node || typeof node !== "object" || Array.isArray(node)) return false;

    const candidate = node as {
      type?: unknown;
      text?: unknown;
      content?: unknown;
      marks?: unknown;
    };
    if (typeof candidate.type !== "string") return false;
    if (candidate.text !== undefined && typeof candidate.text !== "string") {
      return false;
    }
    if (
      candidate.content !== undefined &&
      (!Array.isArray(candidate.content) || !candidate.content.every(isNode))
    ) {
      return false;
    }
    if (
      candidate.marks !== undefined &&
      (!Array.isArray(candidate.marks) ||
        !candidate.marks.every(
          (mark) =>
            !!mark &&
            typeof mark === "object" &&
            typeof (mark as { type?: unknown }).type === "string",
        ))
    ) {
      return false;
    }
    return true;
  };

  const document = value as { type?: unknown; content?: unknown };
  return (
    document.type === "doc" &&
    Array.isArray(document.content) &&
    document.content.every(isNode)
  );
}

export function safeLinkHref(value: string): string | null {
  const href = value.trim();
  if (!href || /\s/.test(href)) return null;

  if (href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/\\")) {
    return href;
  }

  try {
    const url = new URL(href);
    return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol)
      ? href
      : null;
  } catch {
    return null;
  }
}

export function safeImageSource(value: string): string | null {
  const source = value.trim();
  if (!source || /\s/.test(source)) return null;

  if (
    source.startsWith("/") &&
    !source.startsWith("//") &&
    !source.startsWith("/\\")
  ) {
    return source;
  }

  try {
    const url = new URL(source);
    return url.protocol === "http:" || url.protocol === "https:"
      ? source
      : null;
  } catch {
    return null;
  }
}

function collectText(value: unknown): string[] {
  if (!value || typeof value !== "object") return [];

  const node = value as {
    type?: unknown;
    text?: unknown;
    attrs?: Record<string, unknown>;
    content?: unknown;
  };

  if (node.type === "text" && typeof node.text === "string") {
    return [node.text];
  }

  if (node.type === "image" && typeof node.attrs?.alt === "string") {
    return [node.attrs.alt];
  }

  if (!Array.isArray(node.content)) return [];
  return node.content.flatMap(collectText);
}

export function richDocumentToPlainText(value: unknown): string {
  return collectText(value).join(" ").replace(/\s+/g, " ").trim();
}
