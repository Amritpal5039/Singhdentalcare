"use client";

import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import ImageUploader from "@/app/components/ui/ImageUploader";
import TiptapEditor from "@/app/components/ui/TiptapEditor";
import { Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  // Disease Form State
  const [diseaseName, setDiseaseName] = useState("");
  const [diseaseDescription, setDiseaseDescription] = useState<any>(null);
  const [diseasePictureLink, setDiseasePictureLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

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

    try {
      const res = await fetch("/api/diseases-conditions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: diseaseName,
          description: diseaseDescription,
          pictureLink: diseasePictureLink,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitMessage("Disease added successfully!");
        setDiseaseName("");
        setDiseaseDescription(null);
        setDiseasePictureLink("");
      } else {
        setSubmitError(data.error || "Failed to add disease.");
      }
    } catch (err) {
      setSubmitError("An error occurred while adding.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <div className="animate-spin h-8 w-8 border-4 border-[#0071e3] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!session) {
    router.push("/Admin/login");
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* Sidebar/Nav */}
      <nav className="bg-white border-b border-[#d2d2d7] px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <span className="text-2xl">🦷</span>
          <h1 className="apple-title-md !mb-0 tracking-tight">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="apple-caption text-[#6e6e73]">
            Logged in as <span className="font-semibold text-[#1d1d1f]">{session.user.email}</span>
          </span>
          <button 
            onClick={async () => {
              await authClient.signOut();
              router.push("/admin/login");
            }}
            className="text-[#0071e3] apple-caption hover:underline font-medium"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="apple-container py-12">
        <div className="apple-heading-group mb-12">
          <p className="apple-eyebrow">Overview</p>
          <h2 className="apple-title-xl">Welcome back, {session.user.name || "Admin"}.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[20px] border border-[#d2d2d7]">
            <h3 className="apple-title-md mb-2">Appointments</h3>
            <p className="apple-body text-[#6e6e73] mb-4">Manage patient bookings and schedules.</p>
            <Link href="#" className="text-[#0071e3] apple-body hover:underline">View all ›</Link>
          </div>
          <div className="bg-white p-8 rounded-[20px] border border-[#d2d2d7]">
            <h3 className="apple-title-md mb-2">Patients</h3>
            <p className="apple-body text-[#6e6e73] mb-4">Access and update patient medical records.</p>
            <Link href="#" className="text-[#0071e3] apple-body hover:underline">Manage ›</Link>
          </div>
          <div className="bg-white p-8 rounded-[20px] border border-[#d2d2d7]">
            <h3 className="apple-title-md mb-2">Settings</h3>
            <p className="apple-body text-[#6e6e73] mb-4">Configure system and clinic preferences.</p>
            <Link href="#" className="text-[#0071e3] apple-body hover:underline">Open settings ›</Link>
          </div>
        </div>

        {/* Add Disease Form Section */}
        <div className="mt-12 bg-white p-8 rounded-[20px] border border-[#d2d2d7]">
          <h3 className="apple-title-md mb-2">Add Disease / Condition</h3>
          <p className="apple-body text-[#6e6e73] mb-6">Create a new entry for the search directory.</p>
          
          <form onSubmit={handleDiseaseSubmit} className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Disease Name</label>
              <input
                type="text"
                required
                value={diseaseName}
                onChange={(e) => setDiseaseName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#0071e3] focus:border-[#0071e3] outline-none transition-all"
                placeholder="e.g., Asthma"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <TiptapEditor
                value={diseaseDescription}
                onChange={(val) => setDiseaseDescription(val)}
                placeholder="Provide a detailed description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Disease Image</label>
              <ImageUploader onUploadSuccess={(url) => setDiseasePictureLink(url)} />
            </div>

            {submitMessage && <p className="text-sm text-green-600">{submitMessage}</p>}
            {submitError && <p className="text-sm text-red-600">{submitError}</p>}

            <button
              type="submit"
              disabled={isSubmitting || !diseasePictureLink}
              className={`px-6 py-2 rounded-full text-white font-medium flex items-center justify-center transition-all ${
                isSubmitting || !diseasePictureLink ? "bg-black cursor-not-allowed" : "bg-[#0071e3] hover:bg-[#005acc]"
              }`}
            >
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isSubmitting ? "Saving..." : "Add Disease"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
