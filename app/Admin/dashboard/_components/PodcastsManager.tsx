"use client";

import { useState, useEffect } from "react";
import { Loader2, ChevronUp, ChevronDown, Edit3, Trash2 } from "lucide-react";

export function PodcastsManager() {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [isLoadingPodcasts, setIsLoadingPodcasts] = useState(false);
  const [isSubmittingPodcast, setIsSubmittingPodcast] = useState(false);
  const [editingPodcastId, setEditingPodcastId] = useState<string | null>(null);
  const [podcastTitle, setPodcastTitle] = useState("");
  const [podcastVideoUrl, setPodcastVideoUrl] = useState("");
  const [deletePodcastId, setDeletePodcastId] = useState<string | null>(null);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    setIsLoadingPodcasts(true);
    try {
      const res = await fetch("/api/admin/podcasts");
      const data = await res.json();
      if (res.ok) setPodcasts(data);
    } catch (err) {
      console.error("Failed to fetch podcasts");
    } finally {
      setIsLoadingPodcasts(false);
    }
  };

  const handlePodcastSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingPodcast(true);
    try {
      const url = editingPodcastId ? `/api/admin/podcasts/${editingPodcastId}` : "/api/admin/podcasts";
      const method = editingPodcastId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: podcastTitle,
          videoUrl: podcastVideoUrl,
          order: editingPodcastId ? undefined : podcasts.length,
        }),
      });
      if (res.ok) {
        setPodcastTitle("");
        setPodcastVideoUrl("");
        setEditingPodcastId(null);
        fetchPodcasts();
      }
    } catch (err) {
      console.error("Failed to save podcast");
    } finally {
      setIsSubmittingPodcast(false);
    }
  };

  const handleDeletePodcast = async () => {
    if (!deletePodcastId) return;
    try {
      await fetch(`/api/admin/podcasts/${deletePodcastId}`, { method: "DELETE" });
      setDeletePodcastId(null);
      fetchPodcasts();
    } catch (err) {
      console.error("Failed to delete podcast");
    }
  };

  const updatePodcastOrder = async (id: string, newOrder: number) => {
    try {
      await fetch(`/api/admin/podcasts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder }),
      });
      fetchPodcasts();
    } catch (err) {
      console.error("Failed to update order");
    }
  };

  const movePodcast = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= podcasts.length) return;
    const p1 = podcasts[index];
    const p2 = podcasts[newIndex];
    updatePodcastOrder(p1._id, newIndex);
    updatePodcastOrder(p2._id, index);
  };

  return (
    <>
      {deletePodcastId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[24px] max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="apple-title-md mb-2">Remove Podcast?</h3>
            <p className="apple-body text-[#6e6e73] mb-8">This will remove the video from the podcast page.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeletePodcastId(null)} className="flex-1 px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-200 transition-all">Cancel</button>
              <button onClick={handleDeletePodcast} className="flex-1 px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-all flex items-center justify-center">Confirm</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] sticky top-24">
            <h3 className="apple-title-md mb-2">{editingPodcastId ? "Edit Podcast" : "Add New Podcast"}</h3>
            <form onSubmit={handlePodcastSubmit} className="space-y-4 mt-6">
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">Video Title</label>
                <input type="text" value={podcastTitle} onChange={(e) => setPodcastTitle(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3]" placeholder="e.g. Expert Talk on Aligners" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">YouTube URL</label>
                <input type="text" required value={podcastVideoUrl} onChange={(e) => setPodcastVideoUrl(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3]" placeholder="https://youtube.com/watch?v=..." />
              </div>
              <div className="pt-4">
                <button type="submit" disabled={isSubmittingPodcast || !podcastVideoUrl} className="w-full apple-btn-primary !rounded-xl">
                  {isSubmittingPodcast ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : editingPodcastId ? "Update Video" : "Add Video"}
                </button>
                {editingPodcastId && (
                  <button type="button" onClick={() => { setEditingPodcastId(null); setPodcastTitle(""); setPodcastVideoUrl(""); }} className="w-full mt-2 px-4 py-2 rounded-xl border border-[#d2d2d7] hover:bg-gray-50 transition-all">Cancel</button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[24px] border border-[#d2d2d7] overflow-hidden">
            <div className="p-6 border-b border-[#d2d2d7] bg-gray-50/50 flex justify-between items-center">
              <h3 className="apple-title-md !text-[19px]">Active Videos</h3>
              <p className="text-xs text-[#6e6e73]">First video will be the main autoplay video</p>
            </div>
            {isLoadingPodcasts ? (
              <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0071e3]" /></div>
            ) : (
              <div className="divide-y divide-[#d2d2d7]">
                {podcasts.map((p, index) => (
                  <div key={p._id} className="p-4 flex items-center gap-6 group hover:bg-gray-50/50 transition-all">
                    <div className="flex flex-col gap-1">
                      <button onClick={() => movePodcast(index, "up")} disabled={index === 0} className="p-1 hover:bg-white rounded disabled:opacity-20"><ChevronUp size={16} /></button>
                      <button onClick={() => movePodcast(index, "down")} disabled={index === podcasts.length - 1} className="p-1 hover:bg-white rounded disabled:opacity-20"><ChevronDown size={16} /></button>
                    </div>
                    <div className="w-32 aspect-video bg-gray-100 rounded-lg overflow-hidden border border-[#d2d2d7] flex-shrink-0">
                      <img src={`https://img.youtube.com/vi/${p.videoId}/mqdefault.jpg`} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                         <p className="font-semibold text-[#1d1d1f] line-clamp-1">{p.title || "Untitled Video"}</p>
                         {index === 0 && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded">Main Video</span>}
                      </div>
                      <p className="text-xs text-[#6e6e73] truncate max-w-[200px]">{p.videoUrl}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => { setEditingPodcastId(p._id); setPodcastTitle(p.title || ""); setPodcastVideoUrl(p.videoUrl); }} className="p-2 text-[#0071e3] hover:bg-blue-50 rounded-full"><Edit3 size={18} /></button>
                      <button onClick={() => setDeletePodcastId(p._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
                {podcasts.length === 0 && (
                  <div className="p-12 text-center text-[#6e6e73] apple-body">No videos added yet.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
