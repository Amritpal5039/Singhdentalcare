"use client";

import { authClient } from "@/app/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/Admin/dashboard",
        rememberMe: true,
      });

      if (authError) {
        console.error("Full Login Error:", authError);
        setError(authError.message || "Invalid email or password");
      } else {
        router.push("/Admin/dashboard");
      }
    } catch (err: any) {
      console.error("Unexpected Login Error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[340px] bg-white p-10 rounded-[20px]">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6 hover:opacity-70 transition-opacity">
            <span className="text-4xl">🦷</span>
          </Link>
          <h1 className="apple-title-lg mb-2 tracking-tight">Admin Console</h1>
          <p className="apple-body text-[#6e6e73]">
            Singh Dental Care Management
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="apple-eyebrow text-[#86868b] ml-1" htmlFor="email">
              Admin Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ceo@singhdentalcare.in"
              className="w-full h-[50px] px-4 rounded-xl border border-[#d2d2d7] bg-[#f5f5f7] focus:bg-white focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none transition-all apple-body !text-[15px]"
            />
          </div>

          <div className="space-y-2">
            <label className="apple-eyebrow text-[#86868b] ml-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-[50px] px-4 rounded-xl border border-[#d2d2d7] bg-[#f5f5f7] focus:bg-white focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none transition-all apple-body !text-[15px]"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-[13px] font-medium animate-in fade-in slide-in-from-top-1 text-center">
              {error}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full apple-btn-primary h-[50px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all !text-[16px]"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </div>
        </form>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-[#0071e3] apple-caption hover:underline">
            ← Back to main site
          </Link>
        </div>
      </div>
      
      <footer className="mt-auto py-12">
        <p className="apple-caption text-[#86868b]">
          © 2026 Singh Dental Care. All rights reserved.
        </p>
      </footer>
    </main>
  );
}