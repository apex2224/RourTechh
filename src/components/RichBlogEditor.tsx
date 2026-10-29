"use client";

import { useState } from "react";
import {
  Bold,
  Code2,
  Eraser,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Plus,
  Quote,
  Redo2,
  Strikethrough,
  Table2,
  Trash2,
  Underline as UnderlineIcon,
  Undo2,
  Unlink,
  X,
  type LucideIcon,
} from "lucide-react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import type { JSONContent } from "@tiptap/core";
import { SITE_URL } from "@/lib/siteConfig";
import { safeImageSource, safeLinkHref, richTextExtensions } from "@/lib/richContent";
import type { BlogPost } from "@/types";

interface RichBlogEditorProps {
  value: JSONContent;
  posts: BlogPost[];
  onChange: (value: JSONContent) => void;
}

interface ToolbarButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}

const codeLanguages = [
  ["", "Plain text"],
  ["bash", "Bash"],
  ["css", "CSS"],
  ["html", "HTML"],
  ["javascript", "JavaScript"],
  ["json", "JSON"],
  ["python", "Python"],
  ["sql", "SQL"],
  ["typescript", "TypeScript"],
] as const;

function ToolbarButton({
  label,
  icon: Icon,
  onClick,
  active = false,
  disabled = false,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-2 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "border-[#FF5B4D]/50 bg-[#FFF2F0] text-[#D84439]"
          : "border-transparent text-[#444444] hover:border-[#E8E8E8] hover:bg-white"
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

function normalizeInternalPostUrl(slug: string): string {
  return `${SITE_URL.replace(/\/$/, "")}/blog/${encodeURIComponent(slug)}`;
}

export default function RichBlogEditor({
  value,
  posts,
  onChange,
}: RichBlogEditorProps) {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkSearch, setLinkSearch] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [linkError, setLinkError] = useState("");
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageError, setImageError] = useState("");

  const editor = useEditor({
    extensions: richTextExtensions,
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "rich-blog-editor-content min-h-[360px] px-5 py-4 text-sm leading-7 text-[#333333] outline-none sm:px-8",
        "aria-label": "Article body",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getJSON());
    },
  });
  const toolbarState = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => ({
      heading: currentEditor?.isActive("heading")
        ? currentEditor.getAttributes("heading").level
        : null,
      bold: currentEditor?.isActive("bold") ?? false,
      italic: currentEditor?.isActive("italic") ?? false,
      underline: currentEditor?.isActive("underline") ?? false,
      strike: currentEditor?.isActive("strike") ?? false,
      bulletList: currentEditor?.isActive("bulletList") ?? false,
      orderedList: currentEditor?.isActive("orderedList") ?? false,
      blockquote: currentEditor?.isActive("blockquote") ?? false,
      table: currentEditor?.isActive("table") ?? false,
      codeBlock: currentEditor?.isActive("codeBlock") ?? false,
      link: currentEditor?.isActive("link") ?? false,
    }),
  });

  if (!editor || !toolbarState) {
    return (
      <div
        className="min-h-[400px] animate-pulse rounded-xl border border-[#E8E8E8] bg-white"
        aria-label="Loading rich-text editor"
      />
    );
  }

  const selectedText = editor.state.doc.textBetween(
    editor.state.selection.from,
    editor.state.selection.to,
    " ",
  );
  const activeLink = editor.getAttributes("link");
  const filteredPosts = posts
    .filter((post) => post.status === "published")
    .filter((post) => {
      const search = linkSearch.trim().toLowerCase();
      return (
        !search ||
        post.title.toLowerCase().includes(search) ||
        post.slug.toLowerCase().includes(search)
      );
    })
    .slice(0, 6);

  const openLinkDialog = () => {
    setLinkText(selectedText || "");
    setLinkUrl(
      typeof activeLink.href === "string" ? activeLink.href : "",
    );
    setLinkSearch("");
    setLinkError("");
    setIsLinkDialogOpen(true);
  };

  const applyLink = () => {
    const href = safeLinkHref(linkUrl);
    if (!href) {
      setLinkError("Enter a safe HTTP(S), mailto, tel, or site-relative URL.");
      return;
    }

    const isExternal =
      /^https?:\/\//i.test(href) &&
      new URL(href).origin !== new URL(SITE_URL).origin;
    const attributes = {
      href,
      target: isExternal ? "_blank" : null,
      rel: isExternal ? "noopener noreferrer" : null,
    };

    const text = linkText.trim();
    const hasSelection = !editor.state.selection.empty;
    if (!hasSelection || (text && text !== selectedText)) {
      if (!text) {
        setLinkError("Enter anchor text or select text in the article first.");
        return;
      }

      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text,
          marks: [{ type: "link", attrs: attributes }],
        })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink(attributes).run();
    }

    setIsLinkDialogOpen(false);
  };

  const removeLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setIsLinkDialogOpen(false);
  };

  const addImage = () => {
    if (!imageAlt.trim()) {
      setImageError("Add alternative text to describe this image.");
      return;
    }

    const src = safeImageSource(imageUrl);
    if (!src) {
      setImageError("Use an HTTP(S) image URL or a site-relative image path.");
      return;
    }

    editor.chain().focus().setImage({ src, alt: imageAlt.trim() }).run();
    setIsImageDialogOpen(false);
    setImageUrl("");
    setImageAlt("");
    setImageError("");
  };

  const setHeading = (value: string) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
      return;
    }

    const level = Number(value.replace("heading-", ""));
    if (level >= 1 && level <= 6) {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
        .run();
    }
  };

  return (
    <section className="overflow-hidden rounded-xl border border-[#E8E8E8] bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-[#E8E8E8] bg-[#F8F8F6] p-2">
        <label className="sr-only" htmlFor="rich-editor-block-style">
          Paragraph style
        </label>
        <select
          id="rich-editor-block-style"
          value={
            toolbarState.heading !== null
              ? `heading-${toolbarState.heading}`
              : "paragraph"
          }
          onChange={(event) => setHeading(event.target.value)}
          className="h-9 max-w-36 rounded-md border border-[#E8E8E8] bg-white px-2 text-xs text-[#333333]"
        >
          <option value="paragraph">Paragraph</option>
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <option key={level} value={`heading-${level}`}>
              Heading {level}
            </option>
          ))}
        </select>

        <span className="mx-1 h-6 border-l border-[#E0E0DC]" aria-hidden="true" />
        <ToolbarButton
          label="Bold"
          icon={Bold}
          active={toolbarState.bold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="Italic"
          icon={Italic}
          active={toolbarState.italic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          label="Underline"
          icon={UnderlineIcon}
          active={toolbarState.underline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <ToolbarButton
          label="Strikethrough"
          icon={Strikethrough}
          active={toolbarState.strike}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
        <ToolbarButton
          label="Bulleted list"
          icon={List}
          active={toolbarState.bulletList}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="Numbered list"
          icon={ListOrdered}
          active={toolbarState.orderedList}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          label="Blockquote"
          icon={Quote}
          active={toolbarState.blockquote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarButton
          label="Horizontal divider"
          icon={Minus}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
        <ToolbarButton
          label="Insert table"
          icon={Table2}
          active={toolbarState.table}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        />
        {toolbarState.table && (
          <>
            <ToolbarButton
              label="Add row after"
              icon={Plus}
              onClick={() => editor.chain().focus().addRowAfter().run()}
            />
            <ToolbarButton
              label="Add column after"
              icon={Plus}
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            />
            <ToolbarButton
              label="Delete row"
              icon={Trash2}
              onClick={() => editor.chain().focus().deleteRow().run()}
            />
            <ToolbarButton
              label="Delete column"
              icon={Trash2}
              onClick={() => editor.chain().focus().deleteColumn().run()}
            />
            <ToolbarButton
              label="Delete table"
              icon={Trash2}
              onClick={() => editor.chain().focus().deleteTable().run()}
            />
          </>
        )}
        <ToolbarButton
          label="Code block"
          icon={Code2}
          active={toolbarState.codeBlock}
          onClick={() =>
            editor.chain().focus().toggleCodeBlock({ language: "" }).run()
          }
        />
        <label className="sr-only" htmlFor="rich-editor-code-language">
          Code language
        </label>
        <select
          id="rich-editor-code-language"
          aria-label="Code language"
          value={
            typeof editor.getAttributes("codeBlock").language === "string"
              ? editor.getAttributes("codeBlock").language
              : ""
          }
          onChange={(event) => {
            if (editor.isActive("codeBlock")) {
              editor
                .chain()
                .focus()
                .updateAttributes("codeBlock", {
                  language: event.target.value,
                })
                .run();
            } else {
              editor
                .chain()
                .focus()
                .toggleCodeBlock({ language: event.target.value })
                .run();
            }
          }}
          className="h-9 max-w-32 rounded-md border border-[#E8E8E8] bg-white px-2 text-xs text-[#333333]"
          title="Code block language"
        >
          {codeLanguages.map(([language, label]) => (
            <option key={language} value={language}>
              {label}
            </option>
          ))}
        </select>
        <ToolbarButton
          label="Insert or edit link"
          icon={Link2}
          active={toolbarState.link}
          onClick={openLinkDialog}
        />
        <ToolbarButton
          label="Insert image"
          icon={ImagePlus}
          onClick={() => {
            setImageError("");
            setIsImageDialogOpen(true);
          }}
        />
        <span className="mx-1 h-6 border-l border-[#E0E0DC]" aria-hidden="true" />
        <ToolbarButton
          label="Undo"
          icon={Undo2}
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        />
        <ToolbarButton
          label="Redo"
          icon={Redo2}
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        />
        <ToolbarButton
          label="Clear formatting"
          icon={Eraser}
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
        />
      </div>

      <p className="border-b border-[#F0F0EE] px-4 py-2 text-[11px] text-[#777777]">
        Visual article editor · Use Ctrl/Cmd+B, Ctrl/Cmd+I, and Ctrl/Cmd+Z for formatting, and Tab/Shift+Tab to nest or outdent list items.
      </p>
      <EditorContent editor={editor} />

      {isLinkDialogOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rich-link-title"
        >
          <div className="w-full max-w-lg rounded-xl border border-[#E8E8E8] bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 id="rich-link-title" className="text-base font-bold text-[#111111]">
                Insert or edit link
              </h3>
              <button
                type="button"
                onClick={() => setIsLinkDialogOpen(false)}
                className="rounded-md p-1 text-[#666666] hover:bg-[#F8F8F6]"
                aria-label="Close link dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <label className="mb-3 block text-xs font-semibold text-[#444444]">
              Anchor text
              <input
                value={linkText}
                onChange={(event) => setLinkText(event.target.value)}
                placeholder={selectedText || "Text shown in the article"}
                className="mt-1 w-full rounded-lg border border-[#E8E8E8] px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-xs font-semibold text-[#444444]">
              External URL or site-relative path
              <input
                value={linkUrl}
                onChange={(event) => setLinkUrl(event.target.value)}
                placeholder="https://example.com or /blog/article-slug"
                inputMode="url"
                className="mt-1 w-full rounded-lg border border-[#E8E8E8] px-3 py-2 text-sm"
              />
            </label>

            <div className="mt-4 rounded-lg border border-[#E8E8E8] bg-[#F8F8F6] p-3">
              <label className="block text-xs font-semibold text-[#444444]">
                Link to a published article
                <input
                  value={linkSearch}
                  onChange={(event) => setLinkSearch(event.target.value)}
                  placeholder="Search title or slug"
                  className="mt-1 w-full rounded-lg border border-[#E8E8E8] bg-white px-3 py-2 text-sm"
                />
              </label>
              {filteredPosts.length > 0 ? (
                <ul className="mt-2 max-h-40 divide-y divide-[#E8E8E8] overflow-y-auto">
                  {filteredPosts.map((post) => (
                    <li key={post.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setLinkUrl(normalizeInternalPostUrl(post.slug));
                          if (!selectedText) setLinkText(post.title);
                          setLinkError("");
                        }}
                        className="w-full rounded-md px-2 py-2 text-left hover:bg-white"
                      >
                        <span className="block text-xs font-semibold text-[#222222]">
                          {post.title}
                        </span>
                        <span className="block text-[11px] text-[#777777]">
                          /blog/{post.slug}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-xs text-[#777777]">
                  No published articles match that search.
                </p>
              )}
            </div>

            {linkError && (
              <p role="alert" className="mt-3 text-xs text-red-600">
                {linkError}
              </p>
            )}
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              {toolbarState.link && (
                <button
                  type="button"
                  onClick={removeLink}
                  className="mr-auto inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  <Unlink className="h-3.5 w-3.5" />
                  Remove link
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsLinkDialogOpen(false)}
                className="rounded-lg border border-[#E8E8E8] px-3 py-2 text-xs font-semibold text-[#444444]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyLink}
                className="rounded-lg bg-[#FF5B4D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#E84E40]"
              >
                Apply link
              </button>
            </div>
          </div>
        </div>
      )}

      {isImageDialogOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rich-image-title"
        >
          <div className="w-full max-w-md rounded-xl border border-[#E8E8E8] bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 id="rich-image-title" className="text-base font-bold text-[#111111]">
                Insert article image
              </h3>
              <button
                type="button"
                onClick={() => setIsImageDialogOpen(false)}
                className="rounded-md p-1 text-[#666666] hover:bg-[#F8F8F6]"
                aria-label="Close image dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <label className="mb-3 block text-xs font-semibold text-[#444444]">
              Image URL
              <input
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="https://example.com/image.jpg"
                inputMode="url"
                className="mt-1 w-full rounded-lg border border-[#E8E8E8] px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-xs font-semibold text-[#444444]">
              Alternative text
              <input
                value={imageAlt}
                onChange={(event) => setImageAlt(event.target.value)}
                placeholder="Describe the image for accessibility"
                required
                className="mt-1 w-full rounded-lg border border-[#E8E8E8] px-3 py-2 text-sm"
              />
            </label>
            {imageError && (
              <p role="alert" className="mt-3 text-xs text-red-600">
                {imageError}
              </p>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsImageDialogOpen(false)}
                className="rounded-lg border border-[#E8E8E8] px-3 py-2 text-xs font-semibold text-[#444444]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addImage}
                className="rounded-lg bg-[#FF5B4D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#E84E40]"
              >
                Insert image
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
