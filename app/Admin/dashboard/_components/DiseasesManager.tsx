"use client";

import { useState, useEffect } from "react";
import { Loader2, X, Search, Plus, Edit3, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ImageUploader from "@/app/components/ui/ImageUploader";
import TiptapEditor from "@/app/components/ui/TiptapEditor";

interface DiseasesManagerProps {
  currentView: "MANAGE_DISEASES" | "CREATE_DISEASE" | "EDIT_DISEASE";
  onViewChange: (view: any) => void;
}

export function DiseasesManager({ currentView, onViewChange }: DiseasesManagerProps) {
  const [diseases, setDiseases] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isLoadingDiseases, setIsLoadingDiseases] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDiseases, setTotalDiseases] = useState(0);

  // Form State
  const [editingDiseaseId, setEditingDiseaseId] = useState<string | null>(null);
  const [diseaseName, setDiseaseName] = useState("");
  const [diseaseDescription, setDiseaseDescription] = useState<any>(null);
  const [diseasePictureLink, setDiseasePictureLink] = useState("");
  const [diseaseCloudinaryId, setDiseaseCloudinaryId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Delete State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (currentView === "MANAGE_DISEASES") {
      fetchDiseases(currentPage, selectedLetter);
    }
  }, [currentView, currentPage, selectedLetter]);

  const fetchDiseases = async (page: number = 1, letter: string | null = null) => {
    setIsLoadingDiseases(true);
    try {
      let url = `/api/diseases-conditions?page=${page}&limit=12`;
      if (letter) url += `&letter=${letter}`;
      
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setDiseases(data.diseases);
        setTotalPages(data.pagination.totalPages);
        setTotalDiseases(data.pagination.total);
      }
    } catch (err) {
      console.error("Failed to fetch diseases");
    } finally {
      setIsLoadingDiseases(false);
    }
  };

  const resetForm = () => {
    setDiseaseName("");
    setDiseaseDescription(null);
    setDiseasePictureLink("");
    setDiseaseCloudinaryId("");
    setEditingDiseaseId(null);
    setSubmitMessage("");
    setSubmitError("");
  };

  const handleDiseaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!diseasePictureLink) {
      setSubmitError("Please upload an image first.");
      return;
    }
    if (!diseaseDescription) {
      setSubmitError("Please provide a description.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitMessage("");

    const url = editingDiseaseId 
      ? `/api/diseases-conditions/${editingDiseaseId}`
      : "/api/diseases-conditions";
    
    const method = editingDiseaseId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: diseaseName,
          description: diseaseDescription,
          pictureLink: diseasePictureLink,
          cloudinaryId: diseaseCloudinaryId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitMessage(`Disease ${editingDiseaseId ? "updated" : "added"} successfully!`);
        if (!editingDiseaseId) resetForm();
        fetchDiseases(currentPage, selectedLetter);
        setTimeout(() => onViewChange("MANAGE_DISEASES"), 1500);
      } else {
        setSubmitError(data.error || "Failed to save disease.");
      }
    } catch (err) {
      setSubmitError("An error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (disease: any) => {
    setIsLoadingDiseases(true);
    try {
      const res = await fetch(`/api/diseases-conditions/${disease._id}`);
      const data = await res.json();
      if (res.ok) {
        const d = data.disease;
        setEditingDiseaseId(d._id);
        setDiseaseName(d.name);
        setDiseaseDescription(d.description);
        setDiseasePictureLink(d.pictureLink);
        setDiseaseCloudinaryId(d.cloudinaryId);
        onViewChange("EDIT_DISEASE");
      }
    } catch (err) {
      console.error("Failed to fetch disease details");
    } finally {
      setIsLoadingDiseases(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/diseases-conditions/${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        setDiseases(diseases.filter(d => d._id !== deleteId));
        setDeleteId(null);
        fetchDiseases(currentPage, selectedLetter);
      }
    } catch (err) {
      console.error("Failed to delete disease");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredDiseases = searchQuery.length > 0 
    ? diseases.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.slug.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : diseases;

  if (currentView === "CREATE_DISEASE" || currentView === "EDIT_DISEASE") {
    return (
      <div className="bg-white p-8 lg:p-12 rounded-[32px] border border-[#d2d2d7]">
        <form onSubmit={handleDiseaseSubmit} className="space-y-10 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Disease / Condition Name</label>
                <input type="text" required value={diseaseName} onChange={(e) => setDiseaseName(e.target.value)} className="w-full px-5 py-3 border border-[#d2d2d7] rounded-xl focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all apple-body" placeholder="e.g., Dental Caries" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Cover Image</label>
                {diseasePictureLink ? (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#d2d2d7]">
                    <Image src={diseasePictureLink} alt="Preview" fill className="object-cover" />
                    <button type="button" onClick={() => { setDiseasePictureLink(""); setDiseaseCloudinaryId(""); }} className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white text-red-500 shadow-sm transition-all"><X className="w-5 h-5" /></button>
                  </div>
                ) : (
                  <ImageUploader onUploadSuccess={(url, id) => { setDiseasePictureLink(url); setDiseaseCloudinaryId(id); }} />
                )}
              </div>
            </div>
            <div className="space-y-6">
               <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <h4 className="text-blue-800 font-semibold mb-2 flex items-center"><Plus className="w-4 h-4 mr-2" /> Pro Tip: Inline Images</h4>
                  <p className="text-blue-700 text-sm leading-relaxed">You can add more images inside the description area using the image icon in the editor toolbar. You can even resize them!</p>
               </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Rich Content Description</label>
            <TiptapEditor value={diseaseDescription} onChange={(val) => setDiseaseDescription(val)} placeholder="Tell us more about this condition..." />
          </div>
          <div className="pt-6 border-t border-[#d2d2d7] flex flex-col sm:flex-row gap-4">
            <button type="submit" disabled={isSubmitting || !diseasePictureLink} className={`flex-1 px-8 py-4 rounded-full text-white font-semibold flex items-center justify-center transition-all shadow-md ${isSubmitting || !diseasePictureLink ? "bg-black/50 cursor-not-allowed" : "bg-[#0071e3] hover:bg-[#005acc] hover:scale-[1.02]"}`}>
              {isSubmitting && <Loader2 className="w-5 h-5 mr-3 animate-spin" />} {isSubmitting ? "Processing..." : editingDiseaseId ? "Update Published Entry" : "Publish Entry"}
            </button>
            <button type="button" onClick={() => { resetForm(); onViewChange("MANAGE_DISEASES"); }} className="px-8 py-4 rounded-full border border-[#d2d2d7] font-semibold hover:bg-gray-50 transition-all text-[#1d1d1f]">Discard Changes</button>
          </div>
          {submitMessage && <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 animate-in fade-in slide-in-from-top-2">{submitMessage}</div>}
          {submitError && <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">{submitError}</div>}
        </form>
      </div>
    );
  }

  return (
    <>
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[24px] max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="apple-title-md mb-2">Delete Permanently?</h3>
            <p className="apple-body text-[#6e6e73] mb-8">This will remove the entry and its image from Cloudinary. This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-200 transition-all">Cancel</button>
              <button onClick={handleDelete} disabled={isDeleting} className="flex-1 px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-all flex items-center justify-center">
                {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-[20px] border border-[#d2d2d7] space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1 w-full max-w-md relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search diseases by name or slug..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-[#d2d2d7] rounded-full focus:ring-2 focus:ring-[#0071e3] outline-none transition-all" />
            </div>
            <div className="flex items-center gap-4">
              <p className="apple-caption text-[#6e6e73]">Total: {totalDiseases}</p>
              <button onClick={() => { resetForm(); onViewChange("CREATE_DISEASE"); }} className="apple-btn-primary !py-2 !px-6 flex items-center"><Plus className="w-4 h-4 mr-2" />Add New</button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 border-t border-gray-100 pt-4">
            <button
              onClick={() => { setSelectedLetter(null); setCurrentPage(1); }}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${!selectedLetter ? "bg-[#0071e3] text-white" : "hover:bg-gray-100 text-[#6e6e73]"}`}
            >
              All
            </button>
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("").map((l) => (
              <button
                key={l}
                onClick={() => { setSelectedLetter(l); setCurrentPage(1); }}
                className={`w-8 h-8 rounded-md text-sm font-medium transition-all flex items-center justify-center ${selectedLetter === l ? "bg-[#0071e3] text-white" : "hover:bg-gray-100 text-[#6e6e73]"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {isLoadingDiseases ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0071e3]" /></div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDiseases.map((d) => (
                <div key={d._id} className="bg-white rounded-[24px] border border-[#d2d2d7] overflow-hidden group hover:shadow-md transition-all">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-[#f5f5f7] rounded-xl overflow-hidden flex items-center justify-center">
                        {d.pictureLink ? (
                          <img src={d.pictureLink} alt={d.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl">🦷</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(d)} className="p-2 rounded-full hover:bg-gray-100 text-[#6e6e73] transition-all"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteId(d._id)} className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <h4 className="apple-title-md !text-[19px] mb-1 line-clamp-1">{d.name}</h4>
                    <p className="apple-caption text-[#6e6e73] mb-4">Slug: {d.slug}</p>
                    <Link href={`/disease/${d.slug}`} target="_blank" className="text-[#0071e3] text-sm font-medium hover:underline">View public page ›</Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredDiseases.length === 0 && (
              <div className="col-span-full py-20 text-center bg-white rounded-[24px] border border-dashed border-[#d2d2d7]">
                <p className="apple-body text-[#6e6e73]">{searchQuery ? "No matching entries found." : "No entries found for this filter."}</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12 pb-8">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="p-2 rounded-full border border-[#d2d2d7] disabled:opacity-30 hover:bg-white transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="apple-body font-medium">Page {currentPage} of {totalPages}</span>
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="p-2 rounded-full border border-[#d2d2d7] disabled:opacity-30 hover:bg-white transition-all rotate-180"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
