"use client";

import { useEffect } from "react";
import {
  editablePageSeo,
  PageSeoSettings,
} from "@/lib/pageSeoConfig";

interface PreviewUpdateMessage {
  type: "rourtech:seo-preview:update";
  pageId: string;
  settings: PageSeoSettings;
}

interface PreviewReadyMessage {
  type: "rourtech:seo-preview:ready";
  pageId: string;
}

function isPreviewUpdateMessage(value: unknown): value is PreviewUpdateMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as Partial<PreviewUpdateMessage>;
  if (
    message.type !== "rourtech:seo-preview:update" ||
    typeof message.pageId !== "string" ||
    !message.settings ||
    typeof message.settings !== "object"
  ) {
    return false;
  }

  return Object.values(message.settings).every(
    (field) => typeof field === "string",
  );
}

function isTrustedPreviewParent(origin: string): boolean {
  if (origin === window.location.origin) return true;

  try {
    const hostname = new URL(origin).hostname;
    return hostname === "rourtech.com" || hostname === "www.rourtech.com";
  } catch {
    return false;
  }
}

export function SeoPreviewBridge() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (
      window.parent === window ||
      params.get("__rourtechSeoPreview") !== "1"
    ) {
      return;
    }

    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const page = editablePageSeo.find(
      (candidate) => candidate.path.replace(/\/+$/, "") === path,
    );
    if (!page) return;

    const parentOrigin = (() => {
      try {
        return new URL(document.referrer).origin;
      } catch {
        return "";
      }
    })();

    if (!parentOrigin || !isTrustedPreviewParent(parentOrigin)) return;

    let heading: HTMLHeadingElement | null = null;
    let originalTitle = "";
    let originalHeading = "";
    let isReady = false;
    let activeSettings: PageSeoSettings | null = null;
    let observer: MutationObserver | null = null;
    const originalMeta = new Map<string, string | null>();

    const updateMeta = (selector: string, value: string, attribute: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!originalMeta.has(selector)) {
        originalMeta.set(selector, element?.getAttribute("content") ?? null);
      }

      if (!value) {
        const originalValue = originalMeta.get(selector);
        if (originalValue === null) {
          element?.remove();
        } else if (element && originalValue !== undefined) {
          element.setAttribute("content", originalValue);
        }
        return;
      }

      if (!element) {
        element = document.createElement("meta");
        const [key, name] = attribute.startsWith("property:")
          ? ["property", attribute.slice("property:".length)]
          : ["name", attribute.slice("name:".length)];
        element.setAttribute(key, name);
        document.head.appendChild(element);
      }
      if (element.getAttribute("content") !== value) {
        element.setAttribute("content", value);
      }
    };

    const applyPreview = () => {
      if (!activeSettings) return;

      const seoTitle = activeSettings.seoTitle.trim();
      const description = activeSettings.metaDescription.trim();
      const socialTitle = activeSettings.socialTitle.trim() || seoTitle;
      const socialDescription =
        activeSettings.socialDescription.trim() || description;

      const title = seoTitle || originalTitle;
      if (document.title !== title) document.title = title;
      const headingText = activeSettings.h1.trim() || originalHeading;
      if (heading && heading.textContent !== headingText) {
        heading.textContent = headingText;
      }
      updateMeta('meta[name="description"]', description, "name:description");
      updateMeta('meta[property="og:title"]', socialTitle, "property:og:title");
      updateMeta(
        'meta[property="og:description"]',
        socialDescription,
        "property:og:description",
      );
      updateMeta(
        'meta[name="twitter:title"]',
        socialTitle,
        "name:twitter:title",
      );
      updateMeta(
        'meta[name="twitter:description"]',
        socialDescription,
        "name:twitter:description",
      );
    };

    const sendReady = () => {
      heading = document.querySelector<HTMLHeadingElement>("main h1, h1");
      originalTitle = document.title;
      originalHeading = heading?.textContent ?? "";
      isReady = true;

      const readyMessage: PreviewReadyMessage = {
        type: "rourtech:seo-preview:ready",
        pageId: page.id,
      };
      window.parent.postMessage(readyMessage, parentOrigin);
    };

    const handleMessage = (event: MessageEvent<unknown>) => {
      if (
        !isReady ||
        event.source !== window.parent ||
        event.origin !== parentOrigin ||
        !isPreviewUpdateMessage(event.data) ||
        event.data.pageId !== page.id
      ) {
        return;
      }

      activeSettings = event.data.settings;
      applyPreview();
      if (!observer) {
        observer = new MutationObserver(applyPreview);
        observer.observe(document.head, {
          subtree: true,
          childList: true,
          characterData: true,
          attributes: true,
          attributeFilter: ["content"],
        });
        if (heading) {
          observer.observe(heading, {
            subtree: true,
            childList: true,
            characterData: true,
          });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    if (document.readyState === "complete") {
      sendReady();
    } else {
      window.addEventListener("load", sendReady, { once: true });
    }

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("load", sendReady);
      observer?.disconnect();
    };
  }, []);

  return null;
}
