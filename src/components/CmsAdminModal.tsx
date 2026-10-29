import React, { useState, useEffect, useRef } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { isAdminUser } from "@/lib/adminAuthorization";
import { BlogFeaturedImage } from "@/components/BlogFeaturedImage";
import {
  getFirestoreBlogImageId,
  getFirestoreBlogImageUrl,
  prepareBlogImage,
  BlogImageUpdates,
} from "@/lib/blogImages";
import { SITE_URL } from "@/lib/siteConfig";
import { initialBlogPosts } from "@/data/blogData";
import { getErrorCode } from "@/lib/errorCode";

import {
  X,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  Users,
  Globe,
  Copy,
  Check,
  Save,
  ArrowRight,
  Home,
} from "lucide-react";

import { BlogPost, InquiryRecord, ServiceId } from "../types";

interface CmsAdminModalProps {
  isOpen: boolean;

  onClose: () => void;

  posts: BlogPost[];

  onUpdatePosts: (
    newPosts: BlogPost[],
    imageUpdates?: BlogImageUpdates,
  ) => Promise<void>;
}

function getArticleSaveErrorMessage(error: unknown): string {
  const code = getErrorCode(error);

  if (code === "permission-denied") {
    return "Firestore denied this save (permission-denied). Check that the signed-in admin UID is authorized and that the current Firestore rules are deployed to the same Firebase project.";
  }

  if (code === "invalid-argument") {
    return "Firestore rejected the article data (invalid-argument). Check the article fields and content limits, then try again.";
  }

  if (code === "unavailable") {
    return "Firestore is temporarily unreachable (unavailable). Check your connection and try again.";
  }

  if (code === "failed-precondition") {
    return "Firestore could not complete the save (failed-precondition). Check the browser console for the operation details.";
  }

  return code
    ? `Could not save the article to Firestore (${code}). Check the browser console for details.`
    : "Could not save the article to Firestore. Check the browser console for details.";
}

export const CmsAdminModal: React.FC<CmsAdminModalProps> = ({
  isOpen,

  onClose,

  posts,

  onUpdatePosts,
}) => {
  const [activeTab, setActiveTab] = useState<
    "articles" | "inquiries" | "seo-sitemap"
  >("articles");
  const [currentUser, setCurrentUser] = useState<
    import("firebase/auth").User | null
  >(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [passwordResetMessage, setPasswordResetMessage] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [inquiriesError, setInquiriesError] = useState("");
  const [articlesError, setArticlesError] = useState("");
  const [postPendingDelete, setPostPendingDelete] = useState<BlogPost | null>(
    null,
  );
  const [isDeletingPost, setIsDeletingPost] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [isCloseConfirmOpen, setIsCloseConfirmOpen] = useState(false);
  // Articles state

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [isCreating, setIsCreating] = useState(false);

  // Form fields for editing/creating

  const [title, setTitle] = useState("");

  const [slug, setSlug] = useState("");

  const [category, setCategory] = useState<
    "Web Development" | "UI/UX" | "SEO" | "Technology" | "E-commerce"
  >("Web Development");

  const [blogType, setBlogType] = useState("");

  const [authorName, setAuthorName] = useState("Alexander Cross");

  const [authorRole, setAuthorRole] = useState("Principal Solutions Architect");

  const [excerpt, setExcerpt] = useState("");

  const [content, setContent] = useState("");

  const [tagsStr, setTagsStr] = useState("");

  const [featuredImage, setFeaturedImage] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState<
    string | null
  >(null);
  const featuredImageInputRef = useRef<HTMLInputElement>(null);
  const [featuredImageError, setFeaturedImageError] = useState("");
  const [isSavingArticle, setIsSavingArticle] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewPostOverride, setPreviewPostOverride] =
    useState<BlogPost | null>(null);

  const [status, setStatus] = useState<"published" | "draft">("published");

  const [seoTitle, setSeoTitle] = useState("");

  const [seoDescription, setSeoDescription] = useState("");

  const [relatedServiceId, setRelatedServiceId] = useState<ServiceId | "">(
    "web-development",
  );

  // Inquiries state

  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);

  // Copy helper

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedImageFile) {
      setSelectedImagePreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(selectedImageFile);
    setSelectedImagePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedImageFile]);

  const requestClose = () => {
    setIsCloseConfirmOpen(true);
  };

  const confirmClose = () => {
    setIsCloseConfirmOpen(false);
    onClose();
  };

  const getAuthErrorMessage = (error: unknown) => {
    const code = getErrorCode(error);

    switch (code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "The email or password is incorrect. Check your details or reset your password.";
      case "auth/invalid-email":
        return "Enter a valid email address and try again.";
      case "auth/user-disabled":
        return "This account has been disabled. Contact the site administrator.";
      case "auth/too-many-requests":
        return "Too many attempts. Wait a few minutes before trying again.";
      case "auth/operation-not-allowed":
        return "Email/password sign-in is disabled for this Firebase project. Enable the Email/Password provider in Firebase Authentication settings.";
      case "auth/invalid-api-key":
      case "auth/api-key-not-valid":
      case "auth/app-not-authorized":
        return "Firebase configuration is invalid for this app. Verify its web API key and authorized domains in Firebase Console.";
      case "auth/network-request-failed":
        return "Could not reach Firebase. Check your internet connection and try again.";
      default:
        return "Could not sign in. Please try again or contact the site administrator.";
    }
  };

  // Authenticate users and restrict CMS access to the configured admin UIDs.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      setAuthLoading(false);
      if (!user) {
        setCurrentUser(null);
        return;
      }
      if (!isAdminUser(user)) {
        setCurrentUser(null);
        setAuthError("This account is not authorized to access the CMS.");
        try {
          await signOut(auth);
        } catch (error) {
          console.error("Could not sign out the unauthorized account:", error);
        }
        return;
      }
      setAuthError("");
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  // Load real inquiry documents from Firestore, not localStorage or mock data.
  useEffect(() => {
    if (!isOpen || !isAdminUser(currentUser)) return;
    let cancelled = false;
    const loadInquiries = async () => {
      setInquiriesLoading(true);
      setInquiriesError("");
      try {
        const inquiriesQuery = query(
          collection(db, "inquiries"),
          orderBy("createdAt", "desc"),
        );
        const snapshot = await getDocs(inquiriesQuery);
        const records = snapshot.docs.map((item) => {
          const data = item.data();
          const createdAt = data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString()
            : typeof data.createdAt === "string"
              ? data.createdAt
              : new Date().toISOString();
          return { ...data, id: item.id, createdAt } as InquiryRecord;
        });
        if (!cancelled) setInquiries(records);
      } catch (error) {
        console.error("Error loading inquiries from Firestore:", error);
        if (!cancelled)
          setInquiriesError(
            "Could not load inquiries. Check the configured admin UID and Firestore rules.",
          );
      } finally {
        if (!cancelled) setInquiriesLoading(false);
      }
    };
    void loadInquiries();
    return () => {
      cancelled = true;
    };
  }, [isOpen, currentUser]);

  const handleEmailPasswordLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError("");
    setPasswordResetMessage("");
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        adminEmail.trim(),
        adminPassword,
      );
      if (!isAdminUser(result.user)) {
        await signOut(auth);
        setAuthError("This account is not authorized to access the CMS.");
      }
    } catch (error) {
      console.error("Email/password admin login failed:", error);
      setAuthError(getAuthErrorMessage(error));
    }
  };

  const handlePasswordReset = async () => {
    setAuthError("");
    setPasswordResetMessage("");
    const email = adminEmail.trim();
    if (!email) {
      setAuthError(
        "Enter your email address first, then choose Forgot password.",
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setPasswordResetMessage(
        "If an account exists for this email, a password reset link has been sent.",
      );
    } catch (error) {
      console.error("Password reset request failed:", error);
      const code = getErrorCode(error);
      if (code === "auth/user-not-found") {
        setPasswordResetMessage(
          "If an account exists for this email, a password reset link has been sent.",
        );
      } else {
        setAuthError(getAuthErrorMessage(error));
      }
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError("");
    setPasswordResetMessage("");
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      if (!isAdminUser(result.user)) {
        await signOut(auth);
        setAuthError(
          "This Google account is not authorized to access the CMS.",
        );
      }
    } catch (error) {
      console.error("Google admin login failed:", error);
      setAuthError(
        "Google sign-in failed. Check provider settings and authorized domains.",
      );
    }
  };

  if (!isOpen) return null;

  if (authLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="rounded-xl bg-white p-6 text-sm">
          Checking admin session…
        </div>
      </div>
    );
  }

  if (!isAdminUser(currentUser)) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        role="dialog"
        aria-modal="true"
      >
        <div className="w-full max-w-md rounded-2xl border border-[#E8E8E8] bg-white p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-[#111111]">
            RouR Tech CMS Admin
          </h2>
          <p className="mt-1 mb-5 text-sm text-[#666666]">
            Sign in with your authorized admin account.
          </p>
          <form onSubmit={handleEmailPasswordLogin} className="space-y-3">
            <label className="block text-xs font-semibold text-[#333333]">
              Email
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#E8E8E8] px-3 py-2 text-sm"
                autoComplete="username"
              />
            </label>
            <label className="block text-xs font-semibold text-[#333333]">
              Password
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#E8E8E8] px-3 py-2 text-sm"
                autoComplete="current-password"
              />
            </label>
            <div className="text-right">
              <button
                type="button"
                onClick={handlePasswordReset}
                className="text-xs font-semibold text-[#555555] underline hover:text-[#FF5B4D]"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#FF5B4D] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Sign in with Email
            </button>
          </form>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="mt-3 w-full rounded-lg border border-[#E8E8E8] px-4 py-2.5 text-sm font-semibold text-[#111111]"
          >
            Continue with Google
          </button>
          {authError && (
            <p role="alert" className="mt-4 text-sm text-red-600">
              {authError}
            </p>
          )}
          {passwordResetMessage && (
            <p role="status" className="mt-4 text-sm text-emerald-700">
              {passwordResetMessage}
            </p>
          )}
          <button
            type="button"
            onClick={onClose}
            className="mt-5 text-sm text-[#666666] underline"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const handleStartCreate = () => {
    setIsCreating(true);
    setPreviewPostOverride(null);

    setEditingPost(null);

    setTitle("");

    setSlug("");

    setCategory("Web Development");

    setBlogType("");

    setAuthorName("Alexander Cross");

    setAuthorRole("Principal Solutions Architect");

    setExcerpt("");

    setContent(
      "### Overview\n\nProvide the main introduction here...\n\n---\n\n### Architectural Details\n\nDetail technical specifications, benchmarks, or diagrams.",
    );

    setTagsStr("Web Development, Next.js, Architecture");

    setFeaturedImage("");
    setSelectedImageFile(null);
    if (featuredImageInputRef.current) featuredImageInputRef.current.value = "";
    setFeaturedImageError("");

    setStatus("published");

    setSeoTitle("");

    setSeoDescription("");

    setRelatedServiceId("web-development");
  };

  const handleStartEdit = (p: BlogPost) => {
    setEditingPost(p);
    setPreviewPostOverride(null);

    setIsCreating(false);

    setTitle(p.title);

    setSlug(p.slug);

    setCategory(p.category);

    setBlogType(p.blogType || "");

    setAuthorName(p.author.name);

    setAuthorRole(p.author.role);

    setExcerpt(p.excerpt);

    setContent(p.content);

    setTagsStr(p.tags.join(", "));

    setFeaturedImage(p.featuredImage || "");
    setSelectedImageFile(null);
    if (featuredImageInputRef.current) featuredImageInputRef.current.value = "";
    setFeaturedImageError("");

    setStatus(p.status);

    setSeoTitle(p.seoTitle);

    setSeoDescription(p.seoDescription);

    setRelatedServiceId(p.relatedServiceId || "");
  };

  const createPostFromForm = (
    imageUrl: string,
    id = editingPost?.id || `post-${Date.now()}`,
  ): BlogPost => {
    const cleanTitle = title.trim();
    const finalSlug = (slug.trim() || cleanTitle)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const tagsArray = tagsStr
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    return {
      id,
      slug: finalSlug,
      title: cleanTitle || "Untitled article",
      seoTitle: seoTitle.trim() || `${cleanTitle} | RouR Tech Insights`,
      seoDescription: seoDescription.trim() || excerpt.trim().slice(0, 155),
      category,
      ...(blogType.trim() ? { blogType: blogType.trim().slice(0, 80) } : {}),
      tags: tagsArray.length > 0 ? tagsArray : ["Engineering"],
      author: {
        name: authorName.trim() || "RouR Tech Editorial Team",
        role: authorRole.trim() || "Principal Solutions Architect",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      },
      featuredImage: imageUrl.trim(),
      publishDate:
        editingPost?.publishDate ||
        new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      readTime: `${Math.max(3, Math.ceil(content.split(/\s+/).length / 200))} min read`,
      excerpt:
        excerpt.trim() || content.slice(0, 160).replace(/[#\*`-]/g, "") + "...",
      content: content.trim(),
      status,
      ...(relatedServiceId
        ? { relatedServiceId: relatedServiceId as ServiceId }
        : {}),
    };
  };

  const handleFeaturedImageSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    const extension = file.name.split(".").pop()?.toLowerCase();
    const supportedTypes = ["image/jpeg", "image/png", "image/webp"];
    const supportedExtensions = ["jpg", "jpeg", "png", "webp"];
    if (
      !supportedTypes.includes(file.type) ||
      !extension ||
      !supportedExtensions.includes(extension)
    ) {
      setSelectedImageFile(null);
      setFeaturedImageError("Choose a JPG, JPEG, PNG, or WebP image file.");
      event.currentTarget.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSelectedImageFile(null);
      setFeaturedImageError("The image must be 5 MB or smaller.");
      event.currentTarget.value = "";
      return;
    }

    setFeaturedImageError("");
    setFeaturedImage("");
    setSelectedImageFile(file);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || featuredImageError) return;

    const imageUrl = featuredImage.trim();
    if (!selectedImageFile && imageUrl) {
      if (imageUrl.length > 2048 || /\s/.test(imageUrl)) {
        setFeaturedImageError(
          "Use an image URL or site-relative path no longer than 2,048 characters.",
        );
        return;
      }

      if (imageUrl.startsWith("/")) {
        if (imageUrl.startsWith("//") || imageUrl.startsWith("/\\")) {
          setFeaturedImageError(
            "Enter a valid site-relative image path or an HTTP(S) image URL.",
          );
          return;
        }
      } else {
        try {
          const parsedUrl = new URL(imageUrl);
          if (
            (parsedUrl.protocol !== "http:" &&
              parsedUrl.protocol !== "https:")
          ) {
            throw new Error("Unsupported image URL");
          }
        } catch {
          setFeaturedImageError(
            "Enter a valid HTTP(S) image URL, or remove it and upload an image file.",
          );
          return;
        }
      }
    }

    const postId = editingPost?.id || `post-${Date.now()}`;
    const articleToValidate = createPostFromForm(imageUrl, postId);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(articleToValidate.slug)) {
      setArticlesError(
        "Enter an article title or URL slug using English letters and numbers.",
      );
      return;
    }
    if (articleToValidate.tags.length > 30) {
      setArticlesError("An article can have no more than 30 tags.");
      return;
    }
    if (articleToValidate.content.length > 100000) {
      setArticlesError("Article content must be 100,000 characters or fewer.");
      return;
    }
    if (
      articleToValidate.seoTitle.length > 250 ||
      articleToValidate.seoDescription.length > 500
    ) {
      setArticlesError(
        "SEO title must be 250 characters or fewer and description must be 500 characters or fewer.",
      );
      return;
    }

    setIsSavingArticle(true);
    setFeaturedImageError("");
    setArticlesError("");
    try {
      let savedImageUrl = imageUrl;
      let imageUpdates: BlogImageUpdates | undefined;
      if (selectedImageFile) {
        try {
          imageUpdates = {
            [postId]: await prepareBlogImage(selectedImageFile),
          };
        } catch (error) {
          console.error("Could not optimize the selected blog image:", error);
          setFeaturedImageError(
            error instanceof Error
              ? error.message
              : "Could not optimize the selected image.",
          );
          return;
        }
        savedImageUrl = getFirestoreBlogImageUrl(postId);
      } else if (editingPost && imageUrl !== editingPost.featuredImage) {
        const previousImageId = getFirestoreBlogImageId(
          editingPost.featuredImage,
        );
        if (previousImageId) imageUpdates = { [previousImageId]: null };
      }

      const updatedPost = createPostFromForm(savedImageUrl, postId);
      const nextPosts = editingPost
        ? posts.map((post) => (post.id === editingPost.id ? updatedPost : post))
        : [updatedPost, ...posts];

      await onUpdatePosts(nextPosts, imageUpdates);
      setFeaturedImage(savedImageUrl);
      setSelectedImageFile(null);
      if (featuredImageInputRef.current)
        featuredImageInputRef.current.value = "";
      setEditingPost(null);
      setIsCreating(false);
    } catch (error) {
      console.error("Failed to save article to Firestore:", error);
      setArticlesError(getArticleSaveErrorMessage(error));
    } finally {
      setIsSavingArticle(false);
    }
  };

  const handleDeletePost = (id: string) => {
    const post = posts.find((article) => article.id === id);
    if (!post) return;
    setDeleteError("");
    setPostPendingDelete(post);
  };

  const handleToggleVisibility = async (post: BlogPost) => {
    const nextStatus = post.status === "published" ? "draft" : "published";
    const updatedPost = { ...post, status: nextStatus as BlogPost["status"] };
    setArticlesError("");

    try {
      await onUpdatePosts(
        posts.map((currentPost) =>
          currentPost.id === post.id ? updatedPost : currentPost,
        ),
      );
    } catch (error) {
      console.error("Failed to update article visibility:", error);
      setArticlesError(
        "Could not update article visibility. Verify the authorized admin account and Firestore rules, then try again.",
      );
    }
  };

  const confirmDeletePost = async () => {
    if (!postPendingDelete || isDeletingPost) return;

    setIsDeletingPost(true);
    setDeleteError("");
    const nextPosts = posts.filter(
      (post) => post.id !== postPendingDelete.id,
    );
    const imageId = getFirestoreBlogImageId(postPendingDelete.featuredImage);

    try {
      await onUpdatePosts(
        nextPosts,
        imageId ? { [imageId]: null } : undefined,
      );
      if (editingPost?.id === postPendingDelete.id) setEditingPost(null);
      setPostPendingDelete(null);
    } catch (error) {
      console.error("Failed to delete article from Firestore:", error);
      setDeleteError("Could not delete the article. Please try again.");
    } finally {
      setIsDeletingPost(false);
    }
  };

  const handleUpdateInquiryStatus = async (
    id: string,
    newStatus: InquiryRecord["status"],
  ) => {
    try {
      await updateDoc(doc(db, "inquiries", id), { status: newStatus });
      setInquiries((current) =>
        current.map((inq) =>
          inq.id === id ? { ...inq, status: newStatus } : inq,
        ),
      );
      setInquiriesError("");
    } catch (error) {
      console.error("Failed to update inquiry status:", error);
      setInquiriesError(
        "Could not update status. Verify the authorized admin account and Firestore rules.",
      );
    }
  };

  const handleCopy = (text: string, type: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);

      setCopiedCode(type);

      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  // Generate dynamic XML sitemap

  const generateSitemapXml = () => {
    const publishedStaticPosts = initialBlogPosts.filter(
      (post) => post.status === "published",
    );

    const staticUrls = [
      SITE_URL,
      ...[
        "/about",
        "/contact",
        "/faq",
        "/blog",
        "/resources",
        "/services/web-development",
        "/services/ui-ux-design",
        "/services/technical-seo",
        "/services/ecommerce-development",
        "/services/custom-software",
        "/services/maintenance-security",
      ].map((route) => `${SITE_URL}${route}`),
    ];

    const publishedPostUrls = publishedStaticPosts.map(
      (post) => `${SITE_URL}/blog/${post.slug}`,
    );

    return `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${staticUrls

  .map(
    (url) => `  <url>

    <loc>${url}</loc>

  </url>`,
  )

  .join("\n")}

${publishedPostUrls
  .map((url) => `  <url>

    <loc>${url}</loc>

  </url>`)
  .join("\n")}

</urlset>`;
  };

  // Generate robots.txt

  const generateRobotsTxt = () => {
    return `# RouR Tech Production Robots.txt

User-agent: *

Allow: /

Disallow: /admin

Sitemap: ${SITE_URL}/sitemap.xml

`;
  };

  const previewPost =
    previewPostOverride ||
    createPostFromForm(
      selectedImagePreview || featuredImage,
      editingPost?.id || "preview",
    );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" onClick={requestClose} />

      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-[#E8E8E8] max-h-[92vh] overflow-hidden z-10 flex flex-col">
        {/* Top Bar of CMS */}

        <div className="px-6 py-4 border-b border-[#E8E8E8] bg-[#F8F8F6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />

            <h2 className="text-lg font-bold text-[#111111] font-display">
              RouR Tech CMS & Digital Operations
            </h2>

            <span className="text-xs text-[#888888] font-mono-data hidden sm:inline">
              v2.6.4 · Production Live
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                await signOut(auth);
                onClose();
              }}
              className="text-xs font-semibold text-[#666666] hover:text-[#111111]"
            >
              Sign out
            </button>
            <button
              onClick={requestClose}
              className="p-1.5 text-[#666666] hover:text-[#111111] hover:bg-black/5 rounded-md transition-colors cursor-pointer"
              aria-label="Close CMS"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}

        <div className="px-6 border-b border-[#E8E8E8] bg-white flex items-center gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("articles")}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === "articles"
                ? "border-[#FF5B4D] text-[#111111]"
                : "border-transparent text-[#666666] hover:text-[#111111]"
            }`}
          >
            <FileText className="w-4 h-4" />

            <span>Articles & Insights ({posts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === "inquiries"
                ? "border-[#FF5B4D] text-[#111111]"
                : "border-transparent text-[#666666] hover:text-[#111111]"
            }`}
          >
            <Users className="w-4 h-4" />

            <span>Lead Inquiries ({inquiries.length})</span>

            {inquiries.some((i) => i.status === "new") && (
              <span className="w-2 h-2 rounded-full bg-[#FF5B4D]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("seo-sitemap")}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === "seo-sitemap"
                ? "border-[#FF5B4D] text-[#111111]"
                : "border-transparent text-[#666666] hover:text-[#111111]"
            }`}
          >
            <Globe className="w-4 h-4" />

            <span>SEO, Sitemap & Robots</span>
          </button>
        </div>

        {/* Tab Content Area */}

        <div className="p-6 overflow-y-auto flex-1 bg-[#F8F8F6]">
          {/* TAB 1: ARTICLES MANAGEMENT */}

          {activeTab === "articles" && (
            <div>
              {articlesError && (
                <p role="alert" className="mb-4 text-sm text-red-600">
                  {articlesError}
                </p>
              )}
              {isCreating || editingPost ? (
                /* Article Editor Form */

                <form
                  onSubmit={handleSavePost}
                  className="bg-white p-6 sm:p-8 rounded-xl border border-[#E8E8E8] space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E8]">
                    <h3 className="text-lg font-bold text-[#111111] font-display">
                      {isCreating
                        ? "Create New Architectural Article"
                        : `Edit: ${editingPost?.title}`}
                    </h3>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewPostOverride(null);
                          setIsPreviewOpen(true);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-[#333333] hover:text-[#FF5B4D] inline-flex items-center gap-1.5"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Preview
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsCreating(false);

                          setEditingPost(null);
                          setIsPreviewOpen(false);
                        }}
                        className="px-3 py-1.5 text-xs text-[#666666] hover:text-[#111111]"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={isSavingArticle}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />

                        <span>
                          {isSavingArticle
                            ? selectedImageFile
                              ? "Uploading & Saving…"
                              : "Saving…"
                            : "Save Article"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#333333] mb-1">
                        Article Title
                      </label>

                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        maxLength={200}
                        placeholder="e.g. Next.js 15 Server Action Architecture"
                        className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-sm text-[#111111]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#333333] mb-1">
                        Clean URL Slug
                      </label>

                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="auto-generated-from-title"
                        className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-sm text-[#111111] font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#333333] mb-1">
                        Category
                      </label>

                      <select
                        value={category}
                        onChange={(e) =>
                          setCategory(
                            e.target.value as
                              | "Web Development"
                              | "UI/UX"
                              | "SEO"
                              | "Technology"
                              | "E-commerce",
                          )
                        }
                        className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-sm"
                      >
                        <option value="Web Development">Web Development</option>

                        <option value="UI/UX">UI/UX</option>

                        <option value="SEO">SEO</option>

                        <option value="Technology">Technology</option>

                        <option value="E-commerce">E-commerce</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#333333] mb-1">
                        Blog Type <span className="font-normal text-[#888888]">(internal)</span>
                      </label>
                      <input
                        type="text"
                        value={blogType}
                        onChange={(e) => setBlogType(e.target.value)}
                        maxLength={80}
                        placeholder="e.g. Case Study, Announcement, Guide"
                        className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-sm"
                      />
                      <p className="mt-1 text-[11px] text-[#888888]">
                        Only visible in the CMS; visitors see the category.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#333333] mb-1">
                        Publication Status
                      </label>

                      <select
                        value={status}
                        onChange={(e) =>
                          setStatus(e.target.value as "published" | "draft")
                        }
                        className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-sm"
                      >
                        <option value="published">
                          Published (Live on Site)
                        </option>

                        <option value="draft">Draft (Private in CMS)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#333333] mb-1">
                        Related Service CTA
                      </label>

                      <select
                        value={relatedServiceId}
                        onChange={(e) =>
                          setRelatedServiceId(e.target.value as ServiceId | "")
                        }
                        className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-sm"
                      >
                        <option value="">None</option>

                        <option value="web-development">Web Development</option>

                        <option value="ui-ux-design">UI/UX Design</option>

                        <option value="seo-optimization">
                          SEO Optimization
                        </option>

                        <option value="ecommerce-development">
                          E-commerce
                        </option>

                        <option value="custom-software">Custom Software</option>

                        <option value="maintenance-support">Maintenance</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#333333] mb-1">
                        Author Name
                      </label>

                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#333333] mb-1">
                        Author Role
                      </label>

                      <input
                        type="text"
                        value={authorRole}
                        onChange={(e) => setAuthorRole(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  {/* SEO Metadata Box */}

                  <div className="p-4 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] space-y-3">
                    <span className="text-xs font-bold text-[#FF5B4D] uppercase tracking-wider block">
                      Search Engine Metadata (SEO)
                    </span>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                        Custom SEO Title (Max 60 characters)
                      </label>

                      <input
                        type="text"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        maxLength={250}
                        placeholder="Page title displayed in Google search results"
                        className="w-full px-3 py-1.5 bg-white border border-[#E8E8E8] rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                        Meta Description (120–160 characters)
                      </label>

                      <input
                        type="text"
                        value={seoDescription}
                        onChange={(e) => setSeoDescription(e.target.value)}
                        maxLength={500}
                        placeholder="Search snippet summary shown beneath the title"
                        className="w-full px-3 py-1.5 bg-white border border-[#E8E8E8] rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#333333] mb-1">
                      Short Excerpt
                    </label>

                    <textarea
                      rows={2}
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Brief 1-2 sentence lead summary for card previews"
                      className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-sm"
                    />
                  </div>

                  <div className="rounded-xl border border-[#E8E8E8] bg-[#F8F8F6] p-4 space-y-3">
                    <div>
                      <label
                        htmlFor="featured-image-file"
                        className="block text-xs font-bold uppercase text-[#333333] mb-1"
                      >
                        Featured Image / Overview Image
                      </label>
                      <p className="text-xs text-[#666666]">
                        Choose a JPG, JPEG, PNG, or WebP image up to 5 MB, or
                        paste an HTTP(S) image URL. Selected images are
                        compressed and stored in the blog database, not a
                        separate image-storage service.
                      </p>
                    </div>

                    <input
                      ref={featuredImageInputRef}
                      id="featured-image-file"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                      onChange={handleFeaturedImageSelection}
                      className="block w-full text-xs text-[#555555] file:mr-3 file:rounded-md file:border-0 file:bg-white file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#333333] hover:file:bg-[#F2F2EE]"
                    />

                    <div>
                      <label
                        htmlFor="featured-image-url"
                        className="block text-[11px] font-semibold text-[#555555] mb-1"
                      >
                        Or use an image URL
                      </label>
                      <input
                        id="featured-image-url"
                        type="text"
                        inputMode="url"
                        value={featuredImage}
                        maxLength={2048}
                        onChange={(event) => {
                          setFeaturedImage(event.target.value);
                          setSelectedImageFile(null);
                          if (featuredImageInputRef.current)
                            featuredImageInputRef.current.value = "";
                          setFeaturedImageError("");
                        }}
                        placeholder="https://example.com/image.jpg"
                        className="w-full rounded-lg border border-[#E8E8E8] bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <BlogFeaturedImage
                      imageUrl={selectedImagePreview || featuredImage}
                      alt={title.trim() || "Featured image preview"}
                      className="aspect-[16/9] w-full max-w-xl rounded-lg border border-[#E8E8E8]"
                      imageClassName="h-full w-full object-cover"
                    />
                    {selectedImageFile && (
                      <p className="text-xs text-[#555555]">
                        Selected: {selectedImageFile.name} (
                        {(selectedImageFile.size / (1024 * 1024)).toFixed(2)}{" "}
                        MB)
                      </p>
                    )}
                    {(selectedImageFile || featuredImage.trim()) && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImageFile(null);
                          setFeaturedImage("");
                          if (featuredImageInputRef.current)
                            featuredImageInputRef.current.value = "";
                          setFeaturedImageError("");
                        }}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 underline"
                      >
                        Remove featured image
                      </button>
                    )}
                    {featuredImageError && (
                      <p role="alert" className="text-xs text-red-600">
                        {featuredImageError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#333333] mb-1">
                      Full Content (Markdown format)
                    </label>

                    <textarea
                      rows={8}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#333333] mb-1">
                      Tags (Comma-separated)
                    </label>

                    <input
                      type="text"
                      value={tagsStr}
                      onChange={(e) => setTagsStr(e.target.value)}
                      placeholder="Next.js, Performance, TypeScript"
                      className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-sm"
                    />
                  </div>
                </form>
              ) : (
                /* Article Table & List */

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#111111]">
                        Published Articles & Editorial Queue
                      </h3>

                      <p className="text-xs text-[#666666]">
                        Changes immediately reflect across the public site and
                        sitemap.
                      </p>
                    </div>

                    <button
                      onClick={handleStartCreate}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-4 h-4" />

                      <span>Create New Article</span>
                    </button>
                  </div>

                  <div className="bg-white rounded-xl border border-[#E8E8E8] overflow-hidden shadow-xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F8F8F6] border-b border-[#E8E8E8] text-[#777777] font-semibold">
                        <tr>
                          <th className="px-5 py-3">Article Title & Slug</th>

                          <th className="px-4 py-3">Category</th>

                          <th className="px-4 py-3">Author</th>

                          <th className="px-4 py-3">Status</th>

                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-[#E8E8E8]">
                        {posts.map((post) => (
                          <tr
                            key={post.id}
                            className="hover:bg-[#FAFAF9] transition-colors"
                          >
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <BlogFeaturedImage
                                  imageUrl={post.featuredImage}
                                  alt={post.title}
                                  className="h-10 w-16 shrink-0 rounded border border-[#E8E8E8]"
                                  imageClassName="h-full w-full object-cover"
                                />
                                <div className="min-w-0">
                                  <span className="font-bold text-[#111111] block text-sm">
                                    {post.title}
                                  </span>

                                  <span className="text-[11px] text-[#888888] font-mono">
                                    /blog/{post.slug}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="px-4 py-3.5 text-[#555555] font-medium">
                              {post.category}
                            </td>

                            <td className="px-4 py-3.5 text-[#555555]">
                              {post.author.name}
                            </td>

                            <td className="px-4 py-3.5">
                              {post.status === "published" ? (
                                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                  Published
                                </span>
                              ) : (
                                <span className="text-amber-700 font-semibold text-[11px]">
                                  Hidden / Draft
                                </span>
                              )}
                            </td>

                            <td className="px-4 py-3.5 text-right space-x-2">
                              <button
                                onClick={() => void handleToggleVisibility(post)}
                                className="p-1 text-[#666666] hover:text-[#FF5B4D] hover:bg-black/5 rounded transition-colors"
                                title={
                                  post.status === "published"
                                    ? "Hide article from website"
                                    : "Publish article on website"
                                }
                                aria-label={
                                  post.status === "published"
                                    ? `Hide ${post.title} from website`
                                    : `Publish ${post.title} on website`
                                }
                              >
                                {post.status === "published" ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>

                              <button
                                onClick={() => {
                                  setPreviewPostOverride(post);
                                  setIsPreviewOpen(true);
                                }}
                                className="p-1 text-[#666666] hover:text-[#111111] hover:bg-black/5 rounded transition-colors"
                                title="Preview article"
                                aria-label={`Preview ${post.title}`}
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleStartEdit(post)}
                                className="p-1 text-[#666666] hover:text-[#FF5B4D] hover:bg-black/5 rounded transition-colors"
                                title="Edit post"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => void handleDeletePost(post.id)}
                                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                                title="Delete post"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INQUIRIES & LEADS MANAGEMENT */}

          {activeTab === "inquiries" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#111111]">
                    Client Leads & Inbound Project Briefs
                  </h3>

                  <p className="text-xs text-[#666666]">
                    Live project inquiries saved in Cloud Firestore.
                  </p>
                </div>

                <span className="text-xs font-mono-data text-[#888888]">
                  Total Records: {inquiries.length}
                </span>
              </div>

              {inquiriesError && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                  {inquiriesError}
                </p>
              )}
              {inquiriesLoading ? (
                <div className="rounded-xl border border-[#E8E8E8] bg-white p-8 text-center text-sm text-[#666666]">
                  Loading inquiries from Firestore…
                </div>
              ) : inquiries.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-xl border border-[#E8E8E8]">
                  <p className="text-sm font-semibold text-[#111111]">
                    No leads submitted yet
                  </p>

                  <p className="text-xs text-[#666666] mt-1">
                    Submit the contact form on the home page to test this
                    pipeline.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-white p-5 rounded-xl border border-[#E8E8E8] shadow-xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F0F0EE] pb-3">
                        <div className="flex items-center gap-2">
                          <strong className="text-sm font-bold text-[#111111]">
                            {inq.name}
                          </strong>

                          <span className="text-xs text-[#666666]">
                            · {inq.company}
                          </span>

                          <span className="text-xs text-[#888888] font-mono">
                            ({inq.email})
                          </span>
                          {inq.phone && (
                            <span className="text-xs text-[#888888] font-mono">
                              · {inq.phone}
                            </span>
                          )}
                          {inq.phone && (
                            <span className="text-xs text-[#888888] font-mono">
                              · {inq.phone}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono-data bg-[#F2F2EE] px-2 py-0.5 rounded text-[#444444]">
                            {inq.budget}
                          </span>

                          {/* Status Picker */}

                          <select
                            value={inq.status}
                            onChange={(e) =>
                              handleUpdateInquiryStatus(
                                inq.id,
                                e.target.value as InquiryRecord["status"],
                              )
                            }
                            className="text-xs font-semibold px-2 py-1 bg-[#F8F8F6] border border-[#E8E8E8] rounded cursor-pointer"
                          >
                            <option value="new">New Lead</option>

                            <option value="reviewed">Reviewed</option>

                            <option value="contacted">Contacted</option>

                            <option value="proposal_sent">Proposal Sent</option>
                          </select>
                        </div>
                      </div>

                      <div className="text-xs text-[#444444] leading-relaxed">
                        <span className="font-semibold text-[#111111]">
                          Service:
                        </span>{" "}
                        {inq.service}
                        <p className="mt-1.5 p-3 bg-[#F8F8F6] rounded-lg border border-[#E8E8E8] text-[#555555]">
                          {inq.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#888888]">
                        <span>
                          Submitted: {new Date(inq.createdAt).toLocaleString()}
                        </span>

                        <a
                          href={`mailto:${encodeURIComponent(inq.email).replace(/%40/gi, "@")}?subject=${encodeURIComponent(`RouR Tech — Project Discovery for ${inq.company}`)}`}
                          className="font-semibold text-[#FF5B4D] hover:underline"
                        >
                          Send Direct Email Reply →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SEO, SITEMAP & ROBOTS */}

          {activeTab === "seo-sitemap" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-bold text-[#111111]">
                  Search Engine Optimization (SEO) Architecture
                </h3>

                <p className="text-xs text-[#666666]">
                  Real-time generated XML sitemap and search engine directives
                  conforming to Schema.org standards.
                </p>
              </div>

              {/* Live SERP Google Search Result Simulator */}

              <div className="bg-white p-6 rounded-xl border border-[#E8E8E8] space-y-3">
                <span className="text-xs font-bold text-[#FF5B4D] uppercase tracking-wider block">
                  Google Search Snippet Preview
                </span>

                <div className="p-4 bg-[#F9F9F8] rounded-lg border border-[#E8E8E8] max-w-xl font-sans">
                  <div className="flex items-center gap-1.5 text-xs text-[#4d5156] mb-1">
                    <span className="w-4 h-4 rounded-full bg-[#FF5B4D] text-white flex items-center justify-center text-[10px] font-bold">
                      V
                    </span>

                    <span>{new URL(SITE_URL).host}</span>

                    <span className="text-neutral-400">›</span>
                  </div>

                  <h4 className="text-lg text-[#1a0dab] hover:underline cursor-pointer font-medium leading-tight mb-1">
                    RouR Tech — Engineering High-Performance Digital Products
                  </h4>

                  <p className="text-xs text-[#4d5156] leading-snug">
                    Premier digital engineering and product studio. We architect
                    high-performance web systems, custom software, UI/UX design
                    systems, and SEO growth engines.
                  </p>
                </div>
              </div>

              {/* Live sitemap.xml */}

              <div className="bg-white p-6 rounded-xl border border-[#E8E8E8] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                      Live Dynamic /sitemap.xml
                    </span>

                    <span className="text-xs text-[#666666]">
                      Automatically lists all static pages and published blog
                      posts.
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleCopy(generateSitemapXml(), "sitemap")
                      }
                      className="px-3 py-1.5 text-xs font-medium text-[#111111] bg-[#F2F2EE] hover:bg-[#E8E8E4] rounded-md transition-colors flex items-center gap-1.5"
                    >
                      {copiedCode === "sitemap" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}

                      <span>
                        {copiedCode === "sitemap" ? "Copied" : "Copy XML"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#141414] p-4 rounded-lg overflow-x-auto text-xs font-mono text-emerald-400 max-h-48">
                  <pre>{generateSitemapXml()}</pre>
                </div>
              </div>

              {/* Live robots.txt */}

              <div className="bg-white p-6 rounded-xl border border-[#E8E8E8] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                      Live /robots.txt
                    </span>

                    <span className="text-xs text-[#666666]">
                      Directs Googlebot and AI crawlers to public content while
                      protecting internal endpoints.
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(generateRobotsTxt(), "robots")}
                    className="px-3 py-1.5 text-xs font-medium text-[#111111] bg-[#F2F2EE] hover:bg-[#E8E8E4] rounded-md transition-colors flex items-center gap-1.5"
                  >
                    {copiedCode === "robots" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}

                    <span>
                      {copiedCode === "robots" ? "Copied" : "Copy robots.txt"}
                    </span>
                  </button>
                </div>

                <div className="bg-[#141414] p-4 rounded-lg overflow-x-auto text-xs font-mono text-neutral-300">
                  <pre>{generateRobotsTxt()}</pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}

        <div className="px-6 py-3.5 bg-white border-t border-[#E8E8E8] flex items-center justify-between text-xs text-[#666666]">
          <span>RouR Tech Content Management</span>

          <button
            onClick={requestClose}
            className="px-4 py-2 text-xs font-semibold text-[#111111] bg-[#F2F2EE] hover:bg-[#E8E8E4] rounded-lg transition-colors cursor-pointer"
          >
            Close Administration Panel
          </button>
        </div>
      </div>

      {postPendingDelete && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="delete-article-title"
          aria-describedby="delete-article-description"
        >
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white shadow-2xl">
            <div className="flex items-start gap-4 p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Trash2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3
                  id="delete-article-title"
                  className="text-lg font-bold text-[#111111]"
                >
                  Delete this article?
                </h3>
                <p
                  id="delete-article-description"
                  className="mt-2 text-sm leading-relaxed text-[#666666]"
                >
                  <span className="font-semibold text-[#333333]">
                    {postPendingDelete.title}
                  </span>{" "}
                  will be removed from the website and admin list. This cannot
                  be undone.
                </p>
                {deleteError && (
                  <p role="alert" className="mt-3 text-sm text-red-600">
                    {deleteError}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t border-[#E8E8E8] bg-[#F8F8F6] p-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={isDeletingPost}
                onClick={() => setPostPendingDelete(null)}
                className="rounded-lg border border-[#E8E8E8] bg-white px-4 py-2.5 text-sm font-semibold text-[#444444] transition-colors hover:bg-[#F2F2EE] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Keep article
              </button>
              <button
                type="button"
                disabled={isDeletingPost}
                onClick={() => void confirmDeletePost()}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                {isDeletingPost ? "Deleting…" : "Delete article"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isCloseConfirmOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="close-admin-title"
          aria-describedby="close-admin-description"
        >
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white shadow-2xl">
            <div className="p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF0EE] text-[#FF5B4D]">
                <Home className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3
                id="close-admin-title"
                className="mt-4 text-lg font-bold text-[#111111]"
              >
                Leave the admin panel?
              </h3>
              <p
                id="close-admin-description"
                className="mt-2 text-sm leading-relaxed text-[#666666]"
              >
                You’ll return to the RourTech homepage. Any unsaved changes
                will be lost.
              </p>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t border-[#E8E8E8] bg-[#F8F8F6] p-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsCloseConfirmOpen(false)}
                className="rounded-lg border border-[#E8E8E8] bg-white px-4 py-2.5 text-sm font-semibold text-[#444444] transition-colors hover:bg-[#F2F2EE]"
              >
                Stay in admin
              </button>
              <button
                type="button"
                onClick={confirmClose}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF5B4D] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#E84E40]"
              >
                Go to homepage
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-[#F8F8F6]"
          role="dialog"
          aria-modal="true"
          aria-label="Article preview"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E8E8E8] bg-white px-4 py-3 sm:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#FF5B4D]">
                {previewPostOverride
                  ? "Saved article preview"
                  : "Current form preview"}
              </p>
              <p className="text-xs text-[#666666]">
                {previewPostOverride
                  ? "Previewing the saved CMS article."
                  : "This preview uses the current form values."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsPreviewOpen(false);
                setPreviewPostOverride(null);
              }}
              className="rounded-lg border border-[#E8E8E8] px-4 py-2 text-xs font-semibold text-[#333333] hover:bg-[#F8F8F6]"
            >
              Back to editor
            </button>
          </div>

          <article className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-12">
            <header className="mb-8">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[#777777]">
                <span className="font-semibold text-[#FF5B4D]">
                  {previewPost.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{previewPost.publishDate}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {previewPost.status === "draft"
                    ? "Draft preview"
                    : "Published preview"}
                </span>
              </div>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-[#111111] sm:text-5xl">
                {previewPost.title}
              </h1>
              <p className="mb-6 text-lg leading-relaxed text-[#555555]">
                {previewPost.excerpt}
              </p>
              <p className="text-sm text-[#666666]">
                By{" "}
                <span className="font-semibold text-[#111111]">
                  {previewPost.author.name}
                </span>
                {previewPost.author.role ? ` · ${previewPost.author.role}` : ""}
              </p>
            </header>

            <BlogFeaturedImage
              imageUrl={previewPost.featuredImage}
              alt={previewPost.title}
              className="mb-8 aspect-[16/9] rounded-2xl border border-[#E8E8E8]"
              imageClassName="h-full w-full object-cover"
            />

            <div className="rounded-2xl border border-[#E8E8E8] bg-white p-6 leading-relaxed text-[#444444] sm:p-10">
              {previewPost.content.split("\n\n").map((paragraph, index) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;
                if (trimmed.startsWith("### ")) {
                  return (
                    <h2
                      key={index}
                      className="mb-3 mt-8 border-t border-[#F0F0EE] pt-6 text-2xl font-bold text-[#111111] first:mt-0 first:border-0 first:pt-0"
                    >
                      {trimmed.slice(4)}
                    </h2>
                  );
                }
                if (trimmed === "---") {
                  return <hr key={index} className="my-6 border-[#E8E8E8]" />;
                }
                if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                  return (
                    <ul key={index} className="my-4 list-disc space-y-2 pl-5">
                      {trimmed.split("\n").map((item, itemIndex) => (
                        <li key={itemIndex}>{item.replace(/^[\*-]\s+/, "")}</li>
                      ))}
                    </ul>
                  );
                }
                if (trimmed.startsWith("```")) {
                  return (
                    <pre
                      key={index}
                      className="my-5 overflow-x-auto rounded-lg bg-[#141414] p-4 text-xs text-neutral-100"
                    >
                      <code>{trimmed.replace(/```[a-z]*\n?/g, "").trim()}</code>
                    </pre>
                  );
                }
                return (
                  <p key={index} className="my-4 whitespace-pre-wrap">
                    {trimmed}
                  </p>
                );
              })}

              {previewPost.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2 border-t border-[#E8E8E8] pt-5 text-xs text-[#555555]">
                  {previewPost.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </article>
        </div>
      )}
    </div>
  );
};
