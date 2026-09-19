"use client";

import { useState, useEffect } from "react";
import { Loader2, X, Search, Plus, Edit3, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ImageUploader from "@/app/components/ui/ImageUploader";
import TiptapEditor from "@/app/components/ui/TiptapEditor";

interface DoctorOption {
  _id: string;
  name: string;
  credentials?: string;
  specialty?: string;
}

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
  const [blogFaqs, setBlogFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [blogPage, setBlogPage] = useState(1);
  const [blogTotalPages, setBlogTotalPages] = useState(1);

  // Doctor / Author Selection State
  const [doctorsList, setDoctorsList] = useState<DoctorOption[]>([]);
  const [selectedDoctorMode, setSelectedDoctorMode] = useState<string>("default");
  const [blogAuthor, setBlogAuthor] = useState("Dr. Bikramjeet Singh");
  const [blogAuthorCredentials, setBlogAuthorCredentials] = useState("BDS & Fellowship in Implantology");
  const [blogAuthorSpecialty, setBlogAuthorSpecialty] = useState("Chief Dental Surgeon & Implantologist");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/doctors");
        const data = await res.json();
        if (res.ok && data.doctors) {
          setDoctorsList(data.doctors);
        }
      } catch (err) {
        console.error("Failed to fetch doctors in BlogsManager:", err);
      }
    };
    fetchDoctors();
  }, []);

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

  const handleDoctorSelect = (val: string) => {
    setSelectedDoctorMode(val);
    if (val === "default") {
      setBlogAuthor("Dr. Bikramjeet Singh");
      setBlogAuthorCredentials("BDS & Fellowship in Implantology");
      setBlogAuthorSpecialty("Chief Dental Surgeon & Implantologist");
    } else if (val === "custom") {
      setBlogAuthor("");
      setBlogAuthorCredentials("");
      setBlogAuthorSpecialty("");
    } else {
      const doc = doctorsList.find((d) => d._id === val);
      if (doc) {
        setBlogAuthor(doc.name);
        setBlogAuthorCredentials(doc.credentials || "");
        setBlogAuthorSpecialty(doc.specialty || "");
      }
    }
  };

  const resetBlogForm = () => {
    setBlogTitle("");
    setBlogExcerpt("");
    setBlogContent(null);
    setBlogCoverImage("");
    setBlogCoverImageAlt("");
    setBlogCloudinaryId("");
    setBlogFaqs([]);
    setEditingBlogId(null);
    setSelectedDoctorMode("default");
    setBlogAuthor("Dr. Bikramjeet Singh");
    setBlogAuthorCredentials("BDS & Fellowship in Implantology");
    setBlogAuthorSpecialty("Chief Dental Surgeon & Implantologist");
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
          author: blogAuthor.trim() || "Dr. Bikramjeet Singh",
          authorCredentials: blogAuthorCredentials.trim(),
          authorSpecialty: blogAuthorSpecialty.trim(),
          faqs: blogFaqs,
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

  const handleEditBlog = async (blog: any) => {
    setEditingBlogId(blog._id);
    setBlogTitle(blog.title);
    setBlogExcerpt(blog.excerpt);
    setBlogCoverImage(blog.coverImage);
    setBlogCoverImageAlt(blog.coverImageAlt || "");
    setBlogCloudinaryId(blog.cloudinaryId);
    setBlogFaqs(blog.faqs || []);

    const author = blog.author || "Dr. Bikramjeet Singh";
    const creds = blog.authorCredentials || "";
    const spec = blog.authorSpecialty || "";
    setBlogAuthor(author);
    setBlogAuthorCredentials(creds);
    setBlogAuthorSpecialty(spec);

    const matched = doctorsList.find(
      (d) => d.name.toLowerCase().trim() === author.toLowerCase().trim()
    );
    if (matched) {
      setSelectedDoctorMode(matched._id);
    } else if (author === "Dr. Bikramjeet Singh" || author === "Singh Dental Care" || !author) {
      setSelectedDoctorMode("default");
      if (!creds) setBlogAuthorCredentials("BDS & Fellowship in Implantology");
      if (!spec) setBlogAuthorSpecialty("Chief Dental Surgeon & Implantologist");
    } else {
      setSelectedDoctorMode("custom");
    }

    if (blog.content) {
      setBlogContent(blog.content);
    } else {
      try {
        const res = await fetch(`/api/blogs/${blog._id}`);
        const data = await res.json();
        if (res.ok && data.blog?.content) {
          setBlogContent(data.blog.content);
        }
      } catch (err) {
        console.error("Failed to load blog content for edit:", err);
      }
    }

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

          {/* Author & Medical Credential Section (E-E-A-T) */}
          <div className="border-t border-[#d2d2d7] pt-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Author & Medical Reviewer (E-E-A-T)</h3>
              <p className="text-xs text-[#6e6e73]">
                Select the doctor who authored or clinically verified this blog to satisfy Google's medical E-E-A-T standards.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Clinic Doctor</label>
                <select
                  value={selectedDoctorMode}
                  onChange={(e) => handleDoctorSelect(e.target.value)}
                  className="w-full px-5 py-3 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3] transition-all bg-white text-sm"
                >
                  <option value="default">Dr. Bikramjeet Singh (Chief Dental Surgeon & Implantologist - Default)</option>
                  {doctorsList.length > 0 && (
                    <optgroup label="Clinic Doctors">
                      {doctorsList.map((doc) => (
                        <option key={doc._id} value={doc._id}>
                          {doc.name} {doc.specialty ? `— ${doc.specialty}` : ""} {doc.credentials ? `(${doc.credentials})` : ""}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  <option value="custom">+ Other / Custom Doctor (Enter Details Manually)</option>
                </select>
              </div>

              {selectedDoctorMode === "custom" ? (
                <div className="p-5 border border-[#0071e3]/30 bg-[#0071e3]/5 rounded-2xl space-y-4 animate-in fade-in duration-200">
                  <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-wider">Custom Doctor Details</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Doctor Name *</label>
                      <input
                        type="text"
                        required={selectedDoctorMode === "custom"}
                        value={blogAuthor}
                        onChange={(e) => setBlogAuthor(e.target.value)}
                        placeholder="e.g. Dr. Preeti Sharma"
                        className="w-full px-4 py-2.5 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3] bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Degrees / Credentials</label>
                      <input
                        type="text"
                        value={blogAuthorCredentials}
                        onChange={(e) => setBlogAuthorCredentials(e.target.value)}
                        placeholder="e.g. BDS, MDS (Pedodontics)"
                        className="w-full px-4 py-2.5 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3] bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Specialty / Role</label>
                      <input
                        type="text"
                        value={blogAuthorSpecialty}
                        onChange={(e) => setBlogAuthorSpecialty(e.target.value)}
                        placeholder="e.g. Pediatric Dental Specialist"
                        className="w-full px-4 py-2.5 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3] bg-white text-sm"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2 p-3.5 bg-gray-50 rounded-xl border border-[#d2d2d7]/60 text-xs text-gray-600">
                  <span className="font-semibold text-gray-900">{blogAuthor || "Dr. Bikramjeet Singh"}</span>
                  <span>•</span>
                  <span>{blogAuthorCredentials || "BDS & Fellowship in Implantology"}</span>
                  <span>•</span>
                  <span className="text-gray-500">{blogAuthorSpecialty || "Chief Dental Surgeon & Implantologist"}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Blog Content</label>
            <TiptapEditor key={editingBlogId || "new"} value={blogContent} onChange={(val) => setBlogContent(val)} placeholder="Write your blog post here..." />
          </div>

          {/* Blog FAQs Section */}
          <div className="border-t border-[#d2d2d7] pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Blog FAQs</h3>
                <p className="text-xs text-[#6e6e73]">Add frequently asked questions to make the blog post more SEO friendly (AEO/GEO).</p>
              </div>
              <button
                type="button"
                onClick={() => setBlogFaqs([...blogFaqs, { question: "", answer: "" }])}
                className="self-start sm:self-auto px-4 py-2 rounded-full border border-[#0071e3] text-[#0071e3] font-semibold hover:bg-[#0071e3]/5 transition-all flex items-center gap-2 text-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add FAQ Item
              </button>
            </div>

            {blogFaqs.length > 0 ? (
              <div className="space-y-4">
                {blogFaqs.map((faq, index) => (
                  <div key={index} className="p-5 border border-[#d2d2d7] rounded-2xl bg-gray-50/50 space-y-4 relative group">
                    <button
                      type="button"
                      onClick={() => setBlogFaqs(blogFaqs.filter((_, i) => i !== index))}
                      className="absolute top-4 right-4 p-1 text-red-500 hover:bg-red-50 rounded-full transition-all cursor-pointer"
                      title="Remove FAQ"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="pr-10">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Question {index + 1}</label>
                      <input
                        type="text"
                        required
                        value={faq.question}
                        onChange={(e) => {
                          const updated = [...blogFaqs];
                          updated[index] = { ...updated[index], question: e.target.value };
                          setBlogFaqs(updated);
                        }}
                        className="w-full px-4 py-2.5 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3] bg-white transition-all text-sm"
                        placeholder="e.g., What are the main benefits of dental implants?"
                      />
                    </div>
                    <div className="pr-10">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Answer</label>
                      <textarea
                        required
                        value={faq.answer}
                        onChange={(e) => {
                          const updated = [...blogFaqs];
                          updated[index] = { ...updated[index], answer: e.target.value };
                          setBlogFaqs(updated);
                        }}
                        className="w-full px-4 py-2.5 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3] bg-white transition-all h-20 resize-none text-sm"
                        placeholder="e.g., Dental implants provide a permanent, natural-looking solution for missing teeth, restoring full chewing function and preventing bone loss."
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-[#d2d2d7] rounded-2xl bg-gray-50/30">
                <p className="text-sm text-[#6e6e73]">No FAQs added yet. Click 'Add FAQ Item' to add one.</p>
              </div>
            )}
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
