"use client";

import { useState, useEffect } from "react";
import { Loader2, X, ChevronUp, ChevronDown, Edit3, Trash2, Plus } from "lucide-react";
import ImageUploader from "@/app/components/ui/ImageUploader";

export function DoctorsManager() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);
  const [isSubmittingDoctor, setIsSubmittingDoctor] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
  const [doctorName, setDoctorName] = useState("");
  const [doctorCredentials, setDoctorCredentials] = useState("");
  const [doctorSpecialty, setDoctorSpecialty] = useState("");
  const [doctorExperience, setDoctorExperience] = useState("");
  const [doctorImage, setDoctorImage] = useState("");
  const [doctorCloudinaryId, setDoctorCloudinaryId] = useState("");
  const [deleteDoctorId, setDeleteIdDoctor] = useState<string | null>(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setIsLoadingDoctors(true);
    try {
      const res = await fetch("/api/doctors");
      const data = await res.json();
      if (res.ok) setDoctors(data.doctors);
    } catch (err) {
      console.error("Failed to fetch doctors");
    } finally {
      setIsLoadingDoctors(false);
    }
  };

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingDoctor(true);
    try {
      const url = editingDoctorId ? `/api/doctors/${editingDoctorId}` : "/api/doctors";
      const method = editingDoctorId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: doctorName,
          credentials: doctorCredentials,
          specialty: doctorSpecialty,
          experience: doctorExperience,
          image: doctorImage,
          cloudinaryId: doctorCloudinaryId,
          order: editingDoctorId ? undefined : doctors.length,
        }),
      });
      if (res.ok) {
        resetDoctorForm();
        fetchDoctors();
      }
    } catch (err) {
      console.error("Failed to save doctor");
    } finally {
      setIsSubmittingDoctor(false);
    }
  };

  const resetDoctorForm = () => {
    setDoctorName("");
    setDoctorCredentials("");
    setDoctorSpecialty("");
    setDoctorExperience("");
    setDoctorImage("");
    setDoctorCloudinaryId("");
    setEditingDoctorId(null);
  };

  const handleEditDoctor = (d: any) => {
    setEditingDoctorId(d._id);
    setDoctorName(d.name);
    setDoctorCredentials(d.credentials);
    setDoctorSpecialty(d.specialty);
    setDoctorExperience(d.experience);
    setDoctorImage(d.image);
    setDoctorCloudinaryId(d.cloudinaryId);
  };

  const handleDeleteDoctor = async () => {
    if (!deleteDoctorId) return;
    try {
      await fetch(`/api/doctors/${deleteDoctorId}`, { method: "DELETE" });
      setDeleteIdDoctor(null);
      fetchDoctors();
    } catch (err) {
      console.error("Failed to delete doctor");
    }
  };

  const updateDoctorOrder = async (doctorId: string, newOrder: number) => {
    try {
      await fetch(`/api/doctors/${doctorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder }),
      });
      fetchDoctors();
    } catch (err) {
      console.error("Failed to update order");
    }
  };

  const moveDoctor = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= doctors.length) return;

    const doctor1 = doctors[index];
    const doctor2 = doctors[newIndex];

    updateDoctorOrder(doctor1._id, newIndex);
    updateDoctorOrder(doctor2._id, index);
  };

  return (
    <>
      {deleteDoctorId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[24px] max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="apple-title-md mb-2">Remove Doctor?</h3>
            <p className="apple-body text-[#6e6e73] mb-8">This will remove the doctor from the website directory.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteIdDoctor(null)} className="flex-1 px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-200 transition-all">Cancel</button>
              <button onClick={handleDeleteDoctor} className="flex-1 px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-all flex items-center justify-center">Confirm</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] sticky top-24">
            <h3 className="apple-title-md mb-2">{editingDoctorId ? "Edit Doctor" : "Add New Doctor"}</h3>
            <form onSubmit={handleDoctorSubmit} className="space-y-4 mt-6">
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">Full Name</label>
                <input type="text" required value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">Credentials (e.g. BDS, MDS)</label>
                <input type="text" required value={doctorCredentials} onChange={(e) => setDoctorCredentials(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">Specialty</label>
                <input type="text" required value={doctorSpecialty} onChange={(e) => setDoctorSpecialty(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">Experience</label>
                <input type="text" required value={doctorExperience} onChange={(e) => setDoctorExperience(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">Photo</label>
                {doctorImage ? (
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden group">
                    <img src={doctorImage} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => {setDoctorImage(""); setDoctorCloudinaryId("");}} className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full text-red-500 shadow-sm"><X size={16} /></button>
                  </div>
                ) : (
                  <ImageUploader onUploadSuccess={(url, id) => { setDoctorImage(url); setDoctorCloudinaryId(id); }} />
                )}
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={isSubmittingDoctor || !doctorImage} className="flex-1 apple-btn-primary !rounded-xl">
                  {isSubmittingDoctor ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : editingDoctorId ? "Update" : "Add Team Member"}
                </button>
                {editingDoctorId && <button type="button" onClick={resetDoctorForm} className="px-4 py-2 rounded-xl border border-[#d2d2d7] hover:bg-gray-50 transition-all">Cancel</button>}
              </div>
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[24px] border border-[#d2d2d7] overflow-hidden">
            <div className="p-6 border-b border-[#d2d2d7] bg-gray-50/50 flex justify-between items-center">
              <h3 className="apple-title-md !text-[19px]">Display Order</h3>
              <p className="text-xs text-[#6e6e73]">Use arrows to reorder</p>
            </div>
            {isLoadingDoctors ? (
              <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0071e3]" /></div>
            ) : (
              <div className="divide-y divide-[#d2d2d7]">
                {doctors.map((d, index) => (
                  <div key={d._id} className="p-4 flex items-center gap-6 group hover:bg-gray-50/50 transition-all">
                    <div className="flex flex-col gap-1">
                      <button onClick={() => moveDoctor(index, "up")} disabled={index === 0} className="p-1 hover:bg-white rounded disabled:opacity-20"><ChevronUp size={16} /></button>
                      <button onClick={() => moveDoctor(index, "down")} disabled={index === doctors.length - 1} className="p-1 hover:bg-white rounded disabled:opacity-20"><ChevronDown size={16} /></button>
                    </div>
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-[#d2d2d7]">
                      <img src={d.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#1d1d1f]">{d.name}</p>
                      <p className="text-xs text-[#6e6e73]">{d.specialty} • {d.experience}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => handleEditDoctor(d)} className="p-2 text-[#0071e3] hover:bg-blue-50 rounded-full"><Edit3 size={18} /></button>
                      <button onClick={() => setDeleteIdDoctor(d._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
