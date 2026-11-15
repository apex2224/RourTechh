"use client";

import { useState } from "react";
import type { JSONContent } from "@tiptap/core";
import RichArticleContent from "@/components/RichArticleContent";
import RichBlogEditor from "@/components/RichBlogEditor";

const initialContent: JSONContent = {
  type: "doc",
  content: [
    { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Introduction" }] },
    { type: "paragraph", content: [{ type: "text", text: "Opening content. ".repeat(80) }] },
    { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Frontend Development" }] },
    { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "Components" }] },
    { type: "paragraph", content: [{ type: "text", text: "Frontend details. ".repeat(100) }] },
    { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Frontend Development" }] },
    { type: "paragraph", content: [{ type: "text", text: "Duplicate heading details. ".repeat(100) }] },
  ],
};

export default function TocVerificationPage() {
  const [content, setContent] = useState(initialContent);
  const [publishedView, setPublishedView] = useState(false);

  return (
    <main className="min-h-screen bg-[#F8F8F6] p-6">
      <button
        type="button"
        onClick={() => setPublishedView((current) => !current)}
        className="mb-4 rounded border bg-white px-4 py-2"
      >
        {publishedView ? "Show preview" : "Show published view"}
      </button>
      {!publishedView && (
        <div className="max-w-3xl">
          <RichBlogEditor value={content} posts={[]} onChange={setContent} />
        </div>
      )}
      <div
        className={
          publishedView
            ? "mx-auto h-[70vh] max-w-3xl overflow-y-auto border bg-white p-8"
            : "fixed right-0 top-0 h-screen w-[38vw] overflow-y-auto border-l bg-white p-8"
        }
        data-testid={publishedView ? "published-view" : "preview-view"}
      >
        <RichArticleContent contentJson={content} legacyContent="" />
      </div>
    </main>
  );
}
