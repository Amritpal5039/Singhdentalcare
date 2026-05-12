"use client";

import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

interface DashboardNavProps {
  session: any;
  onNavigate: (view: any) => void;
}

export function DashboardNav({ session, onNavigate }: DashboardNavProps) {
  const router = useRouter();

  return (
    <nav className="bg-white border-b border-[#d2d2d7] px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate("OVERVIEW")}>
        <h1 className="apple-title-md !mb-0 tracking-tight">Admin Dashboard</h1>
      </div>
      <div className="flex items-center gap-6">
        <span className="apple-caption text-[#6e6e73]">
          Logged in as <span className="font-semibold text-[#1d1d1f]">{session.user.email}</span>
        </span>
        <button 
          onClick={async () => { 
            await authClient.signOut(); 
            router.push("/Admin/login"); 
          }} 
          className="text-[#0071e3] apple-caption hover:underline font-medium"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
