import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Edit2, Trash2, CheckCircle2, Eye, FileText, 
  Users, Globe, Code, Copy, Check, Download, AlertCircle, Save 
} from 'lucide-react';
import { BlogPost, InquiryRecord, ServiceId } from '../types';

interface CmsAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
  onUpdatePosts: (newPosts: BlogPost[]) => void;
  onViewArticle: (post: BlogPost) => void;
}

export const CmsAdminModal: React.FC<CmsAdminModalProps> = ({
  isOpen,
  onClose,
  posts,
  onUpdatePosts,
  onViewArticle,
}) => {
  const [activeTab, setActiveTab] = useState<'articles' | 'inquiries' | 'seo-sitemap'>('articles');
  
  // Articles state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Form fields for editing/creating
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<'Web Development' | 'UI/UX' | 'SEO' | 'Technology' | 'E-commerce'>('Web Development');
  const [authorName, setAuthorName] = useState('Alexander Cross');
  const [authorRole, setAuthorRole] = useState('Principal Solutions Architect');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tagsStr, setTagsStr] = useState('');
  const [featuredImage, setFeaturedImage] = useState('/src/assets/images/blog_seo_web_performance_1791271638172.jpg');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [relatedServiceId, setRelatedServiceId] = useState<ServiceId | ''>('web-development');

  // Inquiries state
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);

  // Copy helper
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Load inquiries from localStorage
  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('vanguard_inquiries');
        if (stored) {
          setInquiries(JSON.parse(stored));
        } else {
          // Preload mock sample inquiries if empty for demonstration
          const sampleInquiries: InquiryRecord[] = [
            {
              id: 'inq-sample-101',
              createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
              name: 'Marcus Thorne',
              email: 'm.thorne@vanguard-ventures.com',
              company: 'Thorne Capital Partners',
              service: 'Web Development',
              budget: '$50,000 – $100,000',
              description: 'We need to engineer a high-throughput institutional trading portal with sub-second websocket streaming charts and role-based user management.',
              status: 'new',
            },
            {
              id: 'inq-sample-102',
              createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
              name: 'Helena Lindqvist',
              email: 'helena@nordic-interiors.se',
              company: 'Nordic Minimal Atelier',
              service: 'E-commerce Development',
              budget: '$25,000 – $50,000',
              description: 'Looking to migrate our luxury architectural catalog to headless Shopify with 3D product previews and localized multi-currency checkout.',
              status: 'reviewed',
            },
          ];
          setInquiries(sampleInquiries);
          localStorage.setItem('vanguard_inquiries', JSON.stringify(sampleInquiries));
        }
      } catch (e) {
        console.error('Error reading inquiries', e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingPost(null);
    setTitle('');
    setSlug('');
    setCategory('Web Development');
    setAuthorName('Alexander Cross');
    setAuthorRole('Principal Solutions Architect');
    setExcerpt('');
    setContent('### Overview\n\nProvide the main introduction here...\n\n---\n\n### Architectural Details\n\nDetail technical specifications, benchmarks, or diagrams.');
    setTagsStr('Web Development, Next.js, Architecture');
    setFeaturedImage('/src/assets/images/blog_seo_web_performance_1791271638172.jpg');
    setStatus('published');
    setSeoTitle('');
    setSeoDescription('');
    setRelatedServiceId('web-development');
  };

  const handleStartEdit = (p: BlogPost) => {
    setEditingPost(p);
    setIsCreating(false);
    setTitle(p.title);
    setSlug(p.slug);
    setCategory(p.category);
    setAuthorName(p.author.name);
    setAuthorRole(p.author.role);
    setExcerpt(p.excerpt);
    setContent(p.content);
    setTagsStr(p.tags.join(', '));
    setFeaturedImage(p.featuredImage);
    setStatus(p.status);
    setSeoTitle(p.seoTitle);
    setSeoDescription(p.seoDescription);
    setRelatedServiceId(p.relatedServiceId || '');
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalSlug = slug.trim()
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const tagsArray = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const updatedPost: BlogPost = {
      id: editingPost ? editingPost.id : `post-${Date.now()}`,
      slug: finalSlug,
      title: title.trim(),
      seoTitle: seoTitle.trim() || `${title.trim()} | Vanguard Digital Insights`,
      seoDescription: seoDescription.trim() || excerpt.trim().slice(0, 155),
      category,
      tags: tagsArray.length > 0 ? tagsArray : ['Engineering'],
      author: {
        name: authorName.trim() || 'Vanguard Editorial',
        role: authorRole.trim() || 'Principal Solutions Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      },
      featuredImage: featuredImage.trim() || '/src/assets/images/blog_seo_web_performance_1791271638172.jpg',
      publishDate: editingPost?.publishDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: `${Math.max(3, Math.ceil(content.split(/\s+/).length / 200))} min read`,
      excerpt: excerpt.trim() || content.slice(0, 160).replace(/[#*`-]/g, '') + '...',
      content: content.trim(),
      status,
      relatedServiceId: (relatedServiceId as ServiceId) || undefined,
    };

    let nextPosts: BlogPost[];
    if (editingPost) {
      nextPosts = posts.map((p) => (p.id === editingPost.id ? updatedPost : p));
    } else {
      nextPosts = [updatedPost, ...posts];
    }

    onUpdatePosts(nextPosts);
    setEditingPost(null);
    setIsCreating(false);
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const nextPosts = posts.filter((p) => p.id !== id);
      onUpdatePosts(nextPosts);
      if (editingPost?.id === id) {
        setEditingPost(null);
      }
    }
  };

  const handleUpdateInquiryStatus = (id: string, newStatus: InquiryRecord['status']) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    setInquiries(updated);
    try {
      localStorage.setItem('vanguard_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
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
    const published = posts.filter((p) => p.status === 'published');
    const staticUrls = [
      'https://vanguarddigital.agency/',
      'https://vanguarddigital.agency/#services',
      'https://vanguarddigital.agency/#work',
      'https://vanguarddigital.agency/#process',
      'https://vanguarddigital.agency/#insights',
      'https://vanguarddigital.agency/#faq',
      'https://vanguarddigital.agency/#contact',
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`
  )
  .join('\n')}
${published
  .map(
    (post) => `  <url>
    <loc>https://vanguarddigital.agency/blog/${post.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
  };

  // Generate robots.txt
  const generateRobotsTxt = () => {
    return `# Vanguard Digital Production Robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /private/
Disallow: /api/internal/

# Sitemap index location
Sitemap: https://vanguarddigital.agency/sitemap.xml
`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-[#E8E8E8] max-h-[92vh] overflow-hidden z-10 flex flex-col">
        
        {/* Top Bar of CMS */}
        <div className="px-6 py-4 border-b border-[#E8E8E8] bg-[#F8F8F6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h2 className="text-lg font-bold text-[#111111] font-display">
              Vanguard CMS & Digital Operations
            </h2>
            <span className="text-xs text-[#888888] font-mono-data hidden sm:inline">
              v2.6.4 · Production Live
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#666666] hover:text-[#111111] hover:bg-black/5 rounded-md transition-colors cursor-pointer"
            aria-label="Close CMS"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-[#E8E8E8] bg-white flex items-center gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('articles')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'articles'
                ? 'border-[#FF5B4D] text-[#111111]'
                : 'border-transparent text-[#666666] hover:text-[#111111]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Articles & Insights ({posts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'border-[#FF5B4D] text-[#111111]'
                : 'border-transparent text-[#666666] hover:text-[#111111]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Lead Inquiries ({inquiries.length})</span>
            {inquiries.some((i) => i.status === 'new') && (
              <span className="w-2 h-2 rounded-full bg-[#FF5B4D]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('seo-sitemap')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'seo-sitemap'
                ? 'border-[#FF5B4D] text-[#111111]'
                : 'border-transparent text-[#666666] hover:text-[#111111]'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>SEO, Sitemap & Robots</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#F8F8F6]">
          
          {/* TAB 1: ARTICLES MANAGEMENT */}
          {activeTab === 'articles' && (
            <div>
              {isCreating || editingPost ? (
                /* Article Editor Form */
                <form onSubmit={handleSavePost} className="bg-white p-6 sm:p-8 rounded-xl border border-[#E8E8E8] space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E8]">
                    <h3 className="text-lg font-bold text-[#111111] font-display">
                      {isCreating ? 'Create New Architectural Article' : `Edit: ${editingPost?.title}`}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreating(false);
                          setEditingPost(null);
                        }}
                        className="px-3 py-1.5 text-xs text-[#666666] hover:text-[#111111]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save & Publish</span>
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
                        onChange={(e) => setCategory(e.target.value as any)}
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
                        Publication Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as any)}
                        className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-sm"
                      >
                        <option value="published">Published (Live on Site)</option>
                        <option value="draft">Draft (Private in CMS)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#333333] mb-1">
                        Related Service CTA
                      </label>
                      <select
                        value={relatedServiceId}
                        onChange={(e) => setRelatedServiceId(e.target.value as any)}
                        className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-sm"
                      >
                        <option value="">None</option>
                        <option value="web-development">Web Development</option>
                        <option value="ui-ux-design">UI/UX Design</option>
                        <option value="seo-optimization">SEO Optimization</option>
                        <option value="ecommerce-development">E-commerce</option>
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
                        Changes immediately reflect across the public site and sitemap.
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
                          <tr key={post.id} className="hover:bg-[#FAFAF9] transition-colors">
                            <td className="px-5 py-3.5">
                              <span className="font-bold text-[#111111] block text-sm">
                                {post.title}
                              </span>
                              <span className="text-[11px] text-[#888888] font-mono">
                                /blog/{post.slug}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-[#555555] font-medium">
                              {post.category}
                            </td>
                            <td className="px-4 py-3.5 text-[#555555]">
                              {post.author.name}
                            </td>
                            <td className="px-4 py-3.5">
                              {post.status === 'published' ? (
                                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                  Published
                                </span>
                              ) : (
                                <span className="text-amber-700 font-semibold text-[11px]">
                                  Draft
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3.5 text-right space-x-2">
                              <button
                                onClick={() => {
                                  onViewArticle(post);
                                  onClose();
                                }}
                                className="p-1 text-[#666666] hover:text-[#111111] hover:bg-black/5 rounded transition-colors"
                                title="View live post"
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
                                onClick={() => handleDeletePost(post.id)}
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
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#111111]">
                    Client Leads & Inbound Project Briefs
                  </h3>
                  <p className="text-xs text-[#666666]">
                    Real submissions from the contact form stored locally and processed in the pipeline.
                  </p>
                </div>
                <span className="text-xs font-mono-data text-[#888888]">
                  Total Records: {inquiries.length}
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-xl border border-[#E8E8E8]">
                  <p className="text-sm font-semibold text-[#111111]">No leads submitted yet</p>
                  <p className="text-xs text-[#666666] mt-1">Submit the contact form on the home page to test this pipeline.</p>
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
                          <strong className="text-sm font-bold text-[#111111]">{inq.name}</strong>
                          <span className="text-xs text-[#666666]">· {inq.company}</span>
                          <span className="text-xs text-[#888888] font-mono">({inq.email})</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono-data bg-[#F2F2EE] px-2 py-0.5 rounded text-[#444444]">
                            {inq.budget}
                          </span>
                          
                          {/* Status Picker */}
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
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
                        <span className="font-semibold text-[#111111]">Service:</span> {inq.service}
                        <p className="mt-1.5 p-3 bg-[#F8F8F6] rounded-lg border border-[#E8E8E8] text-[#555555]">
                          {inq.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#888888]">
                        <span>Submitted: {new Date(inq.createdAt).toLocaleString()}</span>
                        <a
                          href={`mailto:${inq.email}?subject=Vanguard Digital — Project Discovery for ${inq.company}`}
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
          {activeTab === 'seo-sitemap' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-bold text-[#111111]">
                  Search Engine Optimization (SEO) Architecture
                </h3>
                <p className="text-xs text-[#666666]">
                  Real-time generated XML sitemap and search engine directives conforming to Schema.org standards.
                </p>
              </div>

              {/* Live SERP Google Search Result Simulator */}
              <div className="bg-white p-6 rounded-xl border border-[#E8E8E8] space-y-3">
                <span className="text-xs font-bold text-[#FF5B4D] uppercase tracking-wider block">
                  Google Search Snippet Preview
                </span>
                <div className="p-4 bg-[#F9F9F8] rounded-lg border border-[#E8E8E8] max-w-xl font-sans">
                  <div className="flex items-center gap-1.5 text-xs text-[#4d5156] mb-1">
                    <span className="w-4 h-4 rounded-full bg-[#FF5B4D] text-white flex items-center justify-center text-[10px] font-bold">V</span>
                    <span>vanguarddigital.agency</span>
                    <span className="text-neutral-400">›</span>
                  </div>
                  <h4 className="text-lg text-[#1a0dab] hover:underline cursor-pointer font-medium leading-tight mb-1">
                    Vanguard Digital — Engineering High-Performance Digital Products
                  </h4>
                  <p className="text-xs text-[#4d5156] leading-snug">
                    Premier digital engineering and product studio. We architect high-performance web systems, custom software, UI/UX design systems, and SEO growth engines.
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
                    <span className="text-xs text-[#666666]">Automatically lists all static pages and published blog posts.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(generateSitemapXml(), 'sitemap')}
                      className="px-3 py-1.5 text-xs font-medium text-[#111111] bg-[#F2F2EE] hover:bg-[#E8E8E4] rounded-md transition-colors flex items-center gap-1.5"
                    >
                      {copiedCode === 'sitemap' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode === 'sitemap' ? 'Copied' : 'Copy XML'}</span>
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
                    <span className="text-xs text-[#666666]">Directs Googlebot and AI crawlers to public content while protecting internal endpoints.</span>
                  </div>
                  <button
                    onClick={() => handleCopy(generateRobotsTxt(), 'robots')}
                    className="px-3 py-1.5 text-xs font-medium text-[#111111] bg-[#F2F2EE] hover:bg-[#E8E8E4] rounded-md transition-colors flex items-center gap-1.5"
                  >
                    {copiedCode === 'robots' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'robots' ? 'Copied' : 'Copy robots.txt'}</span>
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
          <span>Vanguard Headless Content Architecture</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#111111] bg-[#F2F2EE] hover:bg-[#E8E8E4] rounded-lg transition-colors cursor-pointer"
          >
            Close Administration Panel
          </button>
        </div>

      </div>
    </div>
  );
};
