"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { User } from "firebase/auth";
import { RotateCw } from "lucide-react";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { isAdminUser } from "@/lib/adminAuthorization";
import {
  editablePageSeo,
  emptyPageSeoSettings,
  PageSeoSettings,
} from "@/lib/pageSeoConfig";
import { getErrorCode } from "@/lib/errorCode";

type SettingsByPage = Record<string, PageSeoSettings>;

const fieldClassName =
  "mt-1 w-full rounded-lg border border-[#E8E8E8] bg-white px-3 py-2 text-sm text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D]";

export function PageSeoPanel({ user }: { user: User }) {
  const [selectedId, setSelectedId] = useState(editablePageSeo[0].id);
  const [settingsByPage, setSettingsByPage] = useState<SettingsByPage>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [previewFrameLoaded, setPreviewFrameLoaded] = useState(false);
  const [previewFrameReady, setPreviewFrameReady] = useState(false);
  const [previewFrameOrigin, setPreviewFrameOrigin] = useState("");
  const [previewFrameError, setPreviewFrameError] = useState(false);
  const [previewRefreshKey, setPreviewRefreshKey] = useState(0);
  const previewFrameRef = useRef<HTMLIFrameElement>(null);

  const selectedPage = useMemo(
    () => editablePageSeo.find((page) => page.id === selectedId)!,
    [selectedId],
  );
  const settings = settingsByPage[selectedId] ?? emptyPageSeoSettings;

  useEffect(() => {
    const frame = previewFrameRef.current;
    if (!previewFrameReady || !previewFrameOrigin || !frame?.contentWindow) {
      return;
    }

    frame.contentWindow.postMessage(
      {
        type: "rourtech:seo-preview:update",
        pageId: selectedId,
        settings,
      },
      previewFrameOrigin,
    );
  }, [previewFrameOrigin, previewFrameReady, selectedId, settings]);

  useEffect(() => {
    const handlePreviewMessage = (event: MessageEvent<unknown>) => {
      if (event.source !== previewFrameRef.current?.contentWindow) return;
      if (!event.data || typeof event.data !== "object") return;

      const message = event.data as { type?: unknown; pageId?: unknown };
      if (
        message.type !== "rourtech:seo-preview:ready" ||
        message.pageId !== selectedId
      ) {
        return;
      }

      try {
        const hostname = new URL(event.origin).hostname;
        if (
          event.origin !== window.location.origin &&
          hostname !== "rourtech.com" &&
          hostname !== "www.rourtech.com"
        ) {
          return;
        }
      } catch {
        return;
      }

      setPreviewFrameOrigin(event.origin);
      setPreviewFrameReady(true);
      setPreviewFrameError(false);
    };

    window.addEventListener("message", handlePreviewMessage);
    return () => window.removeEventListener("message", handlePreviewMessage);
  }, [selectedId]);

  useEffect(() => {
    if (!previewFrameLoaded || previewFrameReady) return;

    const timeout = window.setTimeout(() => {
      setPreviewFrameError(true);
    }, 8000);
    return () => window.clearTimeout(timeout);
  }, [previewFrameLoaded, previewFrameReady, previewRefreshKey, selectedId]);

  useEffect(() => {
    let cancelled = false;

    async function loadSettings() {
      if (!isAdminUser(user)) {
        setError("Only an authorized admin can manage page SEO.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");
      try {
        const snapshot = await getDocs(collection(db, "sitePageSeo"));
        if (cancelled) return;

        const loaded: SettingsByPage = {};
        snapshot.docs.forEach((item) => {
          const data = item.data();
          loaded[item.id] = {
            h1: typeof data.h1 === "string" ? data.h1 : "",
            seoTitle: typeof data.seoTitle === "string" ? data.seoTitle : "",
            metaDescription:
              typeof data.metaDescription === "string"
                ? data.metaDescription
                : "",
            focusKeyword:
              typeof data.focusKeyword === "string" ? data.focusKeyword : "",
            socialTitle:
              typeof data.socialTitle === "string" ? data.socialTitle : "",
            socialDescription:
              typeof data.socialDescription === "string"
                ? data.socialDescription
                : "",
          };
        });
        setSettingsByPage(loaded);
      } catch (loadError) {
        console.error("Could not load page SEO settings:", loadError);
        const code = getErrorCode(loadError);
        setError(
          code === "permission-denied"
            ? "Firestore denied access. Deploy the updated Firestore rules and confirm this account is an authorized admin."
            : `Could not load page SEO settings${code ? ` (${code})` : ""}.`,
        );
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void loadSettings();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const updateField = (field: keyof PageSeoSettings, value: string) => {
    setNotice("");
    setSettingsByPage((previous) => ({
      ...previous,
      [selectedId]: {
        ...(previous[selectedId] ?? emptyPageSeoSettings),
        [field]: value,
      },
    }));
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");

    const activeUser = auth.currentUser;
    if (
      !activeUser ||
      activeUser.uid !== user.uid ||
      !isAdminUser(activeUser)
    ) {
      setError("Your admin session is no longer authorized. Sign in again.");
      return;
    }

    setIsSaving(true);
    try {
      await setDoc(doc(db, "sitePageSeo", selectedId), {
        ...settings,
        updatedAt: serverTimestamp(),
      });
      setNotice("Saved. The live page will use these settings on its next request.");
    } catch (saveError) {
      console.error("Could not save page SEO settings:", saveError);
      const code = getErrorCode(saveError);
      setError(
        code === "permission-denied"
          ? "Firestore denied this save. Deploy the updated Firestore rules and confirm this account is an authorized admin."
          : `Could not save these page settings${code ? ` (${code})` : ""}.`,
      );
    } finally {
      setIsSaving(false);
    }
  };

  const inputField = (
    field: keyof PageSeoSettings,
    label: string,
    maxLength: number,
    multiline = false,
  ) => {
    const value = settings[field];
    return (
      <label className="block text-xs font-semibold text-[#333333]">
        {label}
        {multiline ? (
          <textarea
            value={value}
            onChange={(event) => updateField(field, event.target.value)}
            maxLength={maxLength}
            rows={3}
            className={fieldClassName}
            placeholder="Leave blank to keep the current page value"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(event) => updateField(field, event.target.value)}
            maxLength={maxLength}
            className={fieldClassName}
            placeholder={
              field === "h1"
                ? selectedPage.defaultH1
                : "Leave blank to keep the current page value"
            }
          />
        )}
        <span className="mt-1 block text-right font-normal text-[#888888]">
          {value.length}/{maxLength}
        </span>
      </label>
    );
  };

  const livePreview = (
    <aside
      aria-label={`Live preview for ${selectedPage.label}`}
      className="min-w-0 space-y-4 rounded-xl border border-[#E8E8E8] bg-[#F8F8F6] p-4 sm:p-5 lg:sticky lg:top-4 lg:self-start"
    >
      <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[#E8E8E8] pb-3">
        <div>
          <h4 className="font-semibold text-[#111111]">Live page preview</h4>
          <p className="mt-1 text-xs text-[#666666]">
            Showing the real page. Unsaved H1 and metadata edits update the
            preview only.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setPreviewFrameLoaded(false);
            setPreviewFrameReady(false);
            setPreviewFrameOrigin("");
            setPreviewFrameError(false);
            setPreviewRefreshKey((key) => key + 1);
          }}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#E8E8E8] bg-white px-3 py-2 text-xs font-semibold text-[#444444] hover:bg-[#F8F8F6]"
        >
          <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
          Reload
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#D8D8D4] bg-white">
        <div className="flex shrink-0 items-center gap-2 border-b border-[#E8E8E8] bg-[#F2F2EE] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#E8A29B]" />
          <span className="h-2 w-2 rounded-full bg-[#E7CB82]" />
          <span className="h-2 w-2 rounded-full bg-[#A6C99C]" />
          <span className="ml-2 min-w-0 truncate rounded-md bg-white px-3 py-1 text-[11px] text-[#777777]">
            rourtech.com{selectedPage.path}
          </span>
        </div>
        <div className="relative h-[65vh] min-h-[480px] max-h-[820px] bg-white">
          <iframe
            key={`${selectedId}-${previewRefreshKey}`}
            ref={previewFrameRef}
            src={`${selectedPage.path}${selectedPage.path.includes("?") ? "&" : "?"}__rourtechSeoPreview=1`}
            title={`Live preview of ${selectedPage.label}`}
            onLoad={() => {
              setPreviewFrameLoaded(true);
              setPreviewFrameError(false);
            }}
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-full w-full border-0"
          />
          {(!previewFrameLoaded || !previewFrameReady) && !previewFrameError && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-white/90 text-sm text-[#666666]"
              role="status"
            >
              Connecting to the current page…
            </div>
          )}
          {previewFrameError && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white p-6 text-center"
              role="alert"
            >
              <p className="text-sm font-semibold text-[#333333]">
                Could not connect to the page preview.
              </p>
              <p className="text-xs text-[#666666]">
                Reload the preview. If this keeps happening, check the deployed
                website’s frame security headers.
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-[#666666]">
        Preview stays beside the settings while you edit.
      </p>
    </aside>
  );

  return (
    <>
      <section className="space-y-5">
        <div>
          <h3 className="text-base font-bold text-[#111111]">Page SEO settings</h3>
          <p className="mt-1 text-xs leading-relaxed text-[#666666]">
            Change a page H1, search title and description, or social preview
            without editing code. Blank override fields keep the current page
            value. Focus keyword is an editorial note and is not published as a
            meta-keywords tag. To edit an individual blog post, use the Articles
            tab.
          </p>
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
            {notice}
          </p>
        )}

        <div className="space-y-5">
          <label className="block max-w-xl text-xs font-semibold text-[#333333]">
            Select page
            <select
              value={selectedId}
              onChange={(event) => {
                setSelectedId(event.target.value);
                setError("");
                setNotice("");
                setPreviewFrameLoaded(false);
                setPreviewFrameReady(false);
                setPreviewFrameOrigin("");
                setPreviewFrameError(false);
              }}
              className={fieldClassName}
            >
              {editablePageSeo.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.label} — {page.path}
                </option>
              ))}
            </select>
          </label>

          <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <form
              onSubmit={save}
              className="space-y-4 rounded-xl border border-[#E8E8E8] bg-white p-4 sm:p-6"
            >
              <div className="border-b border-[#E8E8E8] pb-3">
                <h4 className="font-semibold text-[#111111]">{selectedPage.label}</h4>
                <p className="mt-1 text-xs text-[#666666]">{selectedPage.path}</p>
              </div>

              {isLoading ? (
                <p className="text-sm text-[#666666]">Loading page settings…</p>
              ) : (
                <>
                  {inputField("h1", "Page H1", 200)}
                  {inputField("seoTitle", "SEO title", 250)}
                  {inputField("metaDescription", "Meta description", 500, true)}
                  {inputField("focusKeyword", "Focus keyword (editor note)", 150)}
                  {inputField("socialTitle", "Social sharing title", 250)}
                  {inputField(
                    "socialDescription",
                    "Social sharing description",
                    500,
                    true,
                  )}
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-lg bg-[#B84238] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#A33830] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving ? "Saving…" : "Save page settings"}
                  </button>
                </>
              )}
            </form>

            {livePreview}
          </div>
        </div>
      </section>
    </>
  );
}
