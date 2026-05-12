"use client";

import { useState, useEffect } from "react";
import { Loader2, ChevronUp, ChevronDown, Edit3, Trash2 } from "lucide-react";

export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(false);
  const [isSubmittingTestimonial, setIsSubmittingTestimonial] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialTitle, setTestimonialTitle] = useState("");
  const [testimonialVideoUrl, setTestimonialVideoUrl] = useState("");
  const [deleteTestimonialId, setDeleteTestimonialId] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setIsLoadingTestimonials(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      if (res.ok) setTestimonials(data);
    } catch (err) {
      console.error("Failed to fetch testimonials");
    } finally {
      setIsLoadingTestimonials(false);
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingTestimonial(true);
    try {
      const url = editingTestimonialId ? `/api/admin/testimonials/${editingTestimonialId}` : "/api/admin/testimonials";
      const method = editingTestimonialId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: testimonialTitle,
          videoUrl: testimonialVideoUrl,
          order: editingTestimonialId ? undefined : testimonials.length,
        }),
      });
      if (res.ok) {
        setTestimonialTitle("");
        setTestimonialVideoUrl("");
        setEditingTestimonialId(null);
        fetchTestimonials();
      }
    } catch (err) {
      console.error("Failed to save testimonial");
    } finally {
      setIsSubmittingTestimonial(false);
    }
  };

  const handleDeleteTestimonial = async () => {
    if (!deleteTestimonialId) return;
    try {
      await fetch(`/api/admin/testimonials/${deleteTestimonialId}`, { method: "DELETE" });
      setDeleteTestimonialId(null);
      fetchTestimonials();
    } catch (err) {
      console.error("Failed to delete testimonial");
    }
  };

  const updateTestimonialOrder = async (id: string, newOrder: number) => {
    try {
      await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder }),
      });
      fetchTestimonials();
    } catch (err) {
      console.error("Failed to update order");
    }
  };

  const moveTestimonial = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= testimonials.length) return;
    const t1 = testimonials[index];
    const t2 = testimonials[newIndex];
    updateTestimonialOrder(t1._id, newIndex);
    updateTestimonialOrder(t2._id, index);
  };

  return (
    <>
      {deleteTestimonialId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[24px] max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="apple-title-md mb-2">Remove Testimonial?</h3>
            <p className="apple-body text-[#6e6e73] mb-8">This will remove the patient testimonial from the website.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteTestimonialId(null)} className="flex-1 px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-200 transition-all">Cancel</button>
              <button onClick={handleDeleteTestimonial} className="flex-1 px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-all flex items-center justify-center">Confirm</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] sticky top-24">
            <h3 className="apple-title-md mb-2">{editingTestimonialId ? "Edit Testimonial" : "Add New Testimonial"}</h3>
            <form onSubmit={handleTestimonialSubmit} className="space-y-4 mt-6">
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">Short Title / Patient Name</label>
                <input type="text" value={testimonialTitle} onChange={(e) => setTestimonialTitle(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3]" placeholder="Optional" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">YouTube / Shorts URL</label>
                <input type="text" required value={testimonialVideoUrl} onChange={(e) => setTestimonialVideoUrl(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3]" placeholder="https://youtube.com/shorts/..." />
              </div>
              <div className="pt-4">
                <button type="submit" disabled={isSubmittingTestimonial || !testimonialVideoUrl} className="w-full apple-btn-primary !rounded-xl">
                  {isSubmittingTestimonial ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : editingTestimonialId ? "Update Testimonial" : "Add Testimonial"}
                </button>
                {editingTestimonialId && (
                  <button type="button" onClick={() => { setEditingTestimonialId(null); setTestimonialTitle(""); setTestimonialVideoUrl(""); }} className="w-full mt-2 px-4 py-2 rounded-xl border border-[#d2d2d7] hover:bg-gray-50 transition-all">Cancel</button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[24px] border border-[#d2d2d7] overflow-hidden">
            <div className="p-6 border-b border-[#d2d2d7] bg-gray-50/50 flex justify-between items-center">
              <h3 className="apple-title-md !text-[19px]">Active Testimonials</h3>
              <p className="text-xs text-[#6e6e73]">Drag or use arrows to reorder</p>
            </div>
            {isLoadingTestimonials ? (
              <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0071e3]" /></div>
            ) : (
              <div className="divide-y divide-[#d2d2d7]">
                {testimonials.map((t, index) => (
                  <div key={t._id} className="p-4 flex items-center gap-6 group hover:bg-gray-50/50 transition-all">
                    <div className="flex flex-col gap-1">
                      <button onClick={() => moveTestimonial(index, "up")} disabled={index === 0} className="p-1 hover:bg-white rounded disabled:opacity-20"><ChevronUp size={16} /></button>
                      <button onClick={() => moveTestimonial(index, "down")} disabled={index === testimonials.length - 1} className="p-1 hover:bg-white rounded disabled:opacity-20"><ChevronDown size={16} /></button>
                    </div>
                    <div className="w-16 h-24 bg-gray-100 rounded-lg overflow-hidden border border-[#d2d2d7] flex-shrink-0">
                      <img src={`https://img.youtube.com/vi/${t.videoId}/mqdefault.jpg`} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#1d1d1f] line-clamp-1">{t.title || "Untitled Testimonial"}</p>
                      <p className="text-xs text-[#6e6e73] truncate max-w-[200px]">{t.videoUrl}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => { setEditingTestimonialId(t._id); setTestimonialTitle(t.title || ""); setTestimonialVideoUrl(t.videoUrl); }} className="p-2 text-[#0071e3] hover:bg-blue-50 rounded-full"><Edit3 size={18} /></button>
                      <button onClick={() => setDeleteTestimonialId(t._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
                {testimonials.length === 0 && (
                  <div className="p-12 text-center text-[#6e6e73] apple-body">No testimonials added yet.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
