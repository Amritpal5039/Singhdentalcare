"use client";

import { useState, useEffect } from "react";
import { Loader2, X, Search, Plus, Edit3, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ImageUploader from "@/app/components/ui/ImageUploader";
import TiptapEditor from "@/app/components/ui/TiptapEditor";

interface BlogsManagerProps {
  currentView: "MANAGE_BLOGS" | "CREATE_BLOG" | "EDIT_BLOG";
  onViewChange: (view: any) => void;
}

export function BlogsManager({ currentView, onViewChange }: BlogsManagerProps) {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [isSubmittingBlog, setIsSubmittingBlog] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState<any>(null);
  const [blogCoverImage, setBlogCoverImage] = useState("");
  const [blogCoverImageAlt, setBlogCoverImageAlt] = useState("");
  const [blogCloudinaryId, setBlogCloudinaryId] = useState("");
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [blogPage, setBlogPage] = useState(1);
  const [blogTotalPages, setBlogTotalPages] = useState(1);

  useEffect(() => {
    if (currentView === "MANAGE_BLOGS") {
      fetchBlogs(blogPage, blogSearchQuery);
    }
  }, [currentView, blogPage, blogSearchQuery]);

  const fetchBlogs = async (page: number = 1, search: string = "") => {
    setIsLoadingBlogs(true);
    try {
      const res = await fetch(`/api/blogs?page=${page}&limit=10&search=${search}`);
      const data = await res.json();
      if (res.ok) {
        setBlogs(data.blogs);
        setBlogTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error("Failed to fetch blogs");
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  const resetBlogForm = () => {
    setBlogTitle("");
    setBlogExcerpt("");
    setBlogContent(null);
    setBlogCoverImage("");
    setBlogCoverImageAlt("");
    setBlogCloudinaryId("");
    setEditingBlogId(null);
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogCoverImage || !blogContent || !blogTitle || !blogExcerpt) return;

    setIsSubmittingBlog(true);
    try {
      const url = editingBlogId ? `/api/blogs/${editingBlogId}` : "/api/blogs";
      const method = editingBlogId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: blogTitle,
          content: blogContent,
          excerpt: blogExcerpt,
          coverImage: blogCoverImage,
          coverImageAlt: blogCoverImageAlt,
          cloudinaryId: blogCloudinaryId,
        }),
      });
      if (res.ok) {
        resetBlogForm();
        onViewChange("MANAGE_BLOGS");
        fetchBlogs(blogPage, blogSearchQuery);
      }
    } catch (err) {
      console.error("Failed to save blog");
    } finally {
      setIsSubmittingBlog(false);
    }
  };

  const handleEditBlog = (blog: any) => {
    setEditingBlogId(blog._id);
    setBlogTitle(blog.title);
    setBlogExcerpt(blog.excerpt);
    setBlogContent(blog.content);
    setBlogCoverImage(blog.coverImage);
    setBlogCoverImageAlt(blog.coverImageAlt || "");
    setBlogCloudinaryId(blog.cloudinaryId);
    onViewChange("EDIT_BLOG");
  };

  const handleDeleteBlog = async () => {
    if (!deleteBlogId) return;
    try {
      await fetch(`/api/blogs/${deleteBlogId}`, { method: "DELETE" });
      setDeleteBlogId(null);
      fetchBlogs(blogPage, blogSearchQuery);
    } catch (err) {
      console.error("Failed to delete blog");
    }
  };

  if (currentView === "CREATE_BLOG" || currentView === "EDIT_BLOG") {
    return (
      <div className="bg-white p-8 lg:p-12 rounded-[32px] border border-[#d2d2d7]">
        <form onSubmit={handleBlogSubmit} className="space-y-10 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title</label>
                <input type="text" required value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} className="w-full px-5 py-3 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3] transition-all" placeholder="Enter an engaging title..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Excerpt (SEO Description)</label>
                <textarea required value={blogExcerpt} onChange={(e) => setBlogExcerpt(e.target.value)} className="w-full px-5 py-3 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3] transition-all h-24 resize-none" placeholder="Brief summary of the post..." />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                {blogCoverImage ? (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#d2d2d7]">
                    <img src={blogCoverImage} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => { setBlogCoverImage(""); setBlogCloudinaryId(""); }} className="absolute top-2 right-2 p-1 bg-white/80 rounded-full text-red-500 shadow-sm"><X className="w-5 h-5" /></button>
                  </div>
                ) : (
                  <ImageUploader onUploadSuccess={(url, id) => { setBlogCoverImage(url); setBlogCloudinaryId(id); }} />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image Alt Text (SEO)</label>
                <input 
                  type="text" 
                  value={blogCoverImageAlt} 
                  onChange={(e) => setBlogCoverImageAlt(e.target.value)} 
                  className="w-full px-5 py-3 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3] transition-all" 
                  placeholder="Describe this image for Google..." 
                />
                <p className="mt-1 text-xs text-[#6e6e73]">Helps images show up in Google Image search results.</p>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Blog Content</label>
            <TiptapEditor value={blogContent} onChange={(val) => setBlogContent(val)} placeholder="Write your blog post here..." />
          </div>
          <div className="pt-6 border-t border-[#d2d2d7] flex flex-col sm:flex-row gap-4">
            <button type="submit" disabled={isSubmittingBlog || !blogCoverImage} className="flex-1 px-8 py-4 rounded-full bg-[#0071e3] text-white font-semibold flex items-center justify-center transition-all hover:bg-[#005acc] disabled:bg-black/50">
              {isSubmittingBlog && <Loader2 className="w-5 h-5 mr-3 animate-spin" />} {isSubmittingBlog ? "Saving..." : editingBlogId ? "Update Post" : "Publish Post"}
            </button>
            <button type="button" onClick={() => { resetBlogForm(); onViewChange("MANAGE_BLOGS"); }} className="px-8 py-4 rounded-full border border-[#d2d2d7] font-semibold hover:bg-gray-50 transition-all">Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      {deleteBlogId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[24px] max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="apple-title-md mb-2">Delete Blog?</h3>
            <p className="apple-body text-[#6e6e73] mb-8">This will permanently remove the blog post. This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteBlogId(null)} className="flex-1 px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-200 transition-all">Cancel</button>
              <button onClick={handleDeleteBlog} className="flex-1 px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-all flex items-center justify-center">Confirm</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-[20px] border border-[#d2d2d7] space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1 w-full max-w-md relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search blogs..." 
                value={blogSearchQuery} 
                onChange={(e) => setBlogSearchQuery(e.target.value)} 
                className="w-full pl-10 pr-4 py-2 border border-[#d2d2d7] rounded-full focus:ring-2 focus:ring-[#0071e3] outline-none transition-all" 
              />
            </div>
            <button onClick={() => { resetBlogForm(); onViewChange("CREATE_BLOG"); }} className="apple-btn-primary !py-2 !px-6 flex items-center"><Plus className="w-4 h-4 mr-2" />Add New Blog</button>
          </div>
        </div>

        {isLoadingBlogs ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0071e3]" /></div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((b) => (
                <div key={b._id} className="bg-white rounded-[24px] border border-[#d2d2d7] overflow-hidden group hover:shadow-md transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="apple-title-md !text-[19px] mb-0 line-clamp-1">{b.title}</h4>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditBlog(b)} className="p-2 rounded-full hover:bg-gray-100 text-[#6e6e73] transition-all"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteBlogId(b._id)} className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <p className="text-sm text-[#6e6e73] line-clamp-2 mb-4">{b.excerpt}</p>
                    <Link href={`/blog/${b.slug}`} target="_blank" className="text-[#0071e3] text-sm font-medium hover:underline">View Post ›</Link>
                  </div>
                </div>
              ))}
            </div>

            {blogs.length === 0 && (
              <div className="col-span-full py-20 text-center bg-white rounded-[24px] border border-dashed border-[#d2d2d7]">
                <p className="apple-body text-[#6e6e73]">No blogs found.</p>
              </div>
            )}

            {blogTotalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button disabled={blogPage === 1} onClick={() => setBlogPage(prev => prev - 1)} className="p-2 rounded-full border border-[#d2d2d7] disabled:opacity-30 hover:bg-white transition-all"><ArrowLeft className="w-5 h-5" /></button>
                <span className="apple-body font-medium">Page {blogPage} of {blogTotalPages}</span>
                <button disabled={blogPage === blogTotalPages} onClick={() => setBlogPage(prev => prev + 1)} className="p-2 rounded-full border border-[#d2d2d7] disabled:opacity-30 hover:bg-white transition-all rotate-180"><ArrowLeft className="w-5 h-5" /></button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
