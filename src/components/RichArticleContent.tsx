"use client";

import { createElement, useMemo, type ReactNode } from "react";
import type { JSONContent } from "@tiptap/core";
import {
  isRichDocument,
  lowlight,
  markdownToRichDocument,
  safeImageSource,
  safeLinkHref,
} from "@/lib/richContent";
import { SITE_URL } from "@/lib/siteConfig";

interface RichArticleContentProps {
  contentJson?: unknown;
  legacyContent: string;
  className?: string;
}

type HighlightNode = ReturnType<typeof lowlight.highlight>["children"][number];

function renderHighlightNode(node: HighlightNode, key: string): ReactNode {
  if (node.type === "text") return node.value;
  if (node.type !== "element") return null;

  const classes = Array.isArray(node.properties.className)
    ? node.properties.className.filter(
        (name): name is string =>
          typeof name === "string" && /^hljs-[\w-]+$/.test(name),
      )
    : [];

  return (
    <span key={key} className={classes.join(" ") || undefined}>
      {node.children.map((child, index) =>
        renderHighlightNode(child, `${key}-${index}`),
      )}
    </span>
  );
}

function getNodeText(node: JSONContent): string {
  if (typeof node.text === "string") return node.text;
  return (node.content ?? []).map(getNodeText).join("");
}

function renderText(node: JSONContent, key: string): ReactNode {
  let content: ReactNode = node.text ?? "";

  for (const mark of node.marks ?? []) {
    switch (mark.type) {
      case "bold":
        content = <strong key={`${key}-bold`}>{content}</strong>;
        break;
      case "italic":
        content = <em key={`${key}-italic`}>{content}</em>;
        break;
      case "underline":
        content = <u key={`${key}-underline`}>{content}</u>;
        break;
      case "strike":
        content = <s key={`${key}-strike`}>{content}</s>;
        break;
      case "code":
        content = (
          <code
            key={`${key}-code`}
            className="rounded bg-[#F2F2EE] px-1 py-0.5 font-mono text-[0.9em] text-[#333333]"
          >
            {content}
          </code>
        );
        break;
      case "link": {
        const href =
          typeof mark.attrs?.href === "string"
            ? safeLinkHref(mark.attrs.href)
            : null;
        if (!href) break;

        const isExternal =
          /^https?:\/\//i.test(href) &&
          new URL(href).origin !== new URL(SITE_URL).origin;
        content = (
          <a
            key={`${key}-link`}
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-[#D84439] underline underline-offset-2 hover:text-[#B8332A]"
          >
            {content}
          </a>
        );
        break;
      }
    }
  }

  return content;
}

function renderNode(node: JSONContent, key: string): ReactNode {
  if (node.type === "text") return renderText(node, key);

  const children = (node.content ?? []).map((child, index) =>
    renderNode(child, `${key}-${index}`),
  );

  switch (node.type) {
    case "doc":
      return children;
    case "paragraph":
      return (
        <p key={key} className="my-4 whitespace-pre-wrap text-base leading-relaxed text-[#444444]">
          {children}
        </p>
      );
    case "heading": {
      const requestedLevel = node.attrs?.level;
      const level =
        typeof requestedLevel === "number" &&
        requestedLevel >= 1 &&
        requestedLevel <= 6
          ? requestedLevel
          : 2;
      const className =
        level === 1
          ? "my-8 text-3xl font-bold text-[#111111]"
          : level === 2
            ? "my-7 text-2xl font-bold text-[#111111]"
            : level === 3
              ? "my-6 text-xl font-bold text-[#111111]"
              : "my-5 text-lg font-bold text-[#111111]";
      return ReactHeading(level, key, className, children);
    }
    case "bulletList":
      return (
        <ul key={key} className="my-4 list-disc space-y-2 pl-6 text-[#444444]">
          {children}
        </ul>
      );
    case "orderedList":
      return (
        <ol
          key={key}
          start={typeof node.attrs?.start === "number" ? node.attrs.start : 1}
          className="my-4 list-decimal space-y-2 pl-6 text-[#444444]"
        >
          {children}
        </ol>
      );
    case "listItem":
      return <li key={key}>{children}</li>;
    case "blockquote":
      return (
        <blockquote
          key={key}
          className="my-6 border-l-4 border-[#FF5B4D] pl-5 text-[#555555] italic"
        >
          {children}
        </blockquote>
      );
    case "horizontalRule":
      return <hr key={key} className="my-8 border-[#E8E8E8]" />;
    case "hardBreak":
      return <br key={key} />;
    case "codeBlock": {
      const code = getNodeText(node);
      const language =
        typeof node.attrs?.language === "string" &&
        lowlight.registered(node.attrs.language)
          ? node.attrs.language
          : null;
      const highlighted = language ? lowlight.highlight(language, code) : null;

      return (
        <pre
          key={key}
          className="my-6 overflow-x-auto rounded-lg bg-[#141414] p-4 text-sm text-neutral-200"
        >
          <code className={language ? `language-${language}` : undefined}>
            {highlighted
              ? highlighted.children.map((child, index) =>
                  renderHighlightNode(child, `${key}-code-${index}`),
                )
              : code}
          </code>
        </pre>
      );
    }
    case "image": {
      const source =
        typeof node.attrs?.src === "string"
          ? safeImageSource(node.attrs.src)
          : null;
      if (!source) return null;

      return (
        <figure key={key} className="my-7">
          <img
            src={source}
            alt={typeof node.attrs?.alt === "string" ? node.attrs.alt : ""}
            className="mx-auto max-h-[42rem] max-w-full rounded-xl object-contain"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </figure>
      );
    }
    case "table":
      return (
        <div key={key} className="my-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <tbody>{children}</tbody>
          </table>
        </div>
      );
    case "tableRow":
      return <tr key={key} className="border-b border-[#E8E8E8]">{children}</tr>;
    case "tableHeader":
      return (
        <th
          key={key}
          scope="col"
          className="border border-[#E8E8E8] bg-[#F8F8F6] px-3 py-2 font-semibold text-[#111111]"
        >
          {children}
        </th>
      );
    case "tableCell":
      return (
        <td key={key} className="border border-[#E8E8E8] px-3 py-2">
          {children}
        </td>
      );
    default:
      return null;
  }
}

function ReactHeading(
  level: number,
  key: string,
  className: string,
  children: ReactNode,
): ReactNode {
  return createElement(
    `h${level}`,
    { key, className },
    children,
  );
}

export default function RichArticleContent({
  contentJson,
  legacyContent,
  className,
}: RichArticleContentProps) {
  const document = useMemo(() => {
    if (contentJson !== undefined && contentJson !== null) {
      if (isRichDocument(contentJson)) return contentJson;
      console.error("Ignoring malformed rich-text article content.");
    }
    return markdownToRichDocument(legacyContent);
  }, [contentJson, legacyContent]);

  return (
    <div className={className}>
      {(document.content ?? []).map((node, index) =>
        renderNode(node, `article-node-${index}`),
      )}
    </div>
  );
}
