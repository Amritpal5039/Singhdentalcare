"use client";

import { ArrowLeft } from "lucide-react";

interface ViewHeaderProps {
  currentView: string;
  sessionName: string;
  onBack: () => void;
}

export function ViewHeader({ currentView, sessionName, onBack }: ViewHeaderProps) {
  const getEyebrow = () => {
    switch (currentView) {
      case "OVERVIEW": return "Overview";
      case "MANAGE_USERS": return "User Management";
      case "MANAGE_DOCTORS": return "Medical Team";
      case "MANAGE_APPOINTMENTS": return "Patient Bookings";
      default: return "Diseases & Conditions";
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case "OVERVIEW": return `Welcome back, ${sessionName || "Admin"}.`;
      case "MANAGE_DISEASES": return "Manage Directory";
      case "CREATE_DISEASE": return "Add New Entry";
      case "EDIT_DISEASE": return "Edit Entry";
      case "MANAGE_USERS": return "System Administrators";
      case "MANAGE_DOCTORS": return "Meet The Dentists";
      case "MANAGE_APPOINTMENTS": return "Appointments";
      case "MANAGE_TESTIMONIALS": return "Patient Reviews";
      case "MANAGE_PODCASTS": return "Podcasts";
      case "MANAGE_MEMBERSHIP": return "Membership Plans";
      case "MANAGE_BLOGS": return "Blog Posts";
      case "CREATE_BLOG": return "Add Blog Post";
      case "EDIT_BLOG": return "Edit Blog Post";
      default: return "Admin Dashboard";
    }
  };

  return (
    <div className="apple-heading-group mb-12 flex justify-between items-end">
      <div>
        <p className="apple-eyebrow">{getEyebrow()}</p>
        <h2 className="apple-title-xl">{getTitle()}</h2>
      </div>
      {currentView !== "OVERVIEW" && (
        <button 
          onClick={onBack} 
          className="flex items-center text-[#0071e3] font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>
      )}
    </div>
  );
}
