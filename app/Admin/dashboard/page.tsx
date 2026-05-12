"use client";

import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DashboardNav } from "./_components/DashboardNav";
import { ViewHeader } from "./_components/ViewHeader";
import { Overview } from "./_components/Overview";
import { AppointmentsManager } from "./_components/AppointmentsManager";
import { DoctorsManager } from "./_components/DoctorsManager";
import { DiseasesManager } from "./_components/DiseasesManager";
import { UsersManager } from "./_components/UsersManager";
import { PodcastsManager } from "./_components/PodcastsManager";
import { TestimonialsManager } from "./_components/TestimonialsManager";
import { MembershipManager } from "./_components/MembershipManager";
import { BlogsManager } from "./_components/BlogsManager";

type ViewState = 
  | "OVERVIEW" 
  | "MANAGE_DISEASES" | "CREATE_DISEASE" | "EDIT_DISEASE" 
  | "MANAGE_USERS" 
  | "MANAGE_DOCTORS" 
  | "MANAGE_TESTIMONIALS" 
  | "MANAGE_APPOINTMENTS" 
  | "MANAGE_PODCASTS" 
  | "MANAGE_MEMBERSHIP" 
  | "MANAGE_BLOGS" | "CREATE_BLOG" | "EDIT_BLOG";

export default function AdminDashboard() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [currentView, setCurrentView] = useState<ViewState>("OVERVIEW");

  const hasPermission = (permission: string) => {
    if (!session?.user) return false;
    // @ts-ignore - custom fields
    const userPermissions = (session.user as any).permissions || "all";
    if (userPermissions === "all") return true;
    return userPermissions.split(",").includes(permission);
  };

  const handleBack = () => {
    if (currentView === "CREATE_DISEASE" || currentView === "EDIT_DISEASE") {
      setCurrentView("MANAGE_DISEASES");
    } else if (currentView === "CREATE_BLOG" || currentView === "EDIT_BLOG") {
      setCurrentView("MANAGE_BLOGS");
    } else {
      setCurrentView("OVERVIEW");
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
      <DashboardNav session={session} onNavigate={setCurrentView} />

      <div className="apple-container py-12">
        <ViewHeader 
          currentView={currentView} 
          sessionName={session.user.name || "Admin"} 
          onBack={handleBack} 
        />

        {currentView === "OVERVIEW" && (
          <Overview hasPermission={hasPermission} onNavigate={setCurrentView} />
        )}

        {currentView === "MANAGE_APPOINTMENTS" && hasPermission("appointments") && (
          <AppointmentsManager />
        )}

        {currentView === "MANAGE_DOCTORS" && hasPermission("doctors") && (
          <DoctorsManager />
        )}

        {(currentView === "MANAGE_DISEASES" || currentView === "CREATE_DISEASE" || currentView === "EDIT_DISEASE") && hasPermission("diseases") && (
          <DiseasesManager currentView={currentView} onViewChange={setCurrentView} />
        )}

        {currentView === "MANAGE_USERS" && hasPermission("users") && (
          <UsersManager currentUserEmail={session.user.email} />
        )}

        {currentView === "MANAGE_TESTIMONIALS" && hasPermission("testimonials") && (
          <TestimonialsManager />
        )}

        {currentView === "MANAGE_PODCASTS" && hasPermission("podcasts") && (
          <PodcastsManager />
        )}

        {currentView === "MANAGE_MEMBERSHIP" && hasPermission("membership") && (
          <MembershipManager />
        )}

        {(currentView === "MANAGE_BLOGS" || currentView === "CREATE_BLOG" || currentView === "EDIT_BLOG") && hasPermission("blogs") && (
          <BlogsManager currentView={currentView} onViewChange={setCurrentView} />
        )}
      </div>
    </main>
  );
}
