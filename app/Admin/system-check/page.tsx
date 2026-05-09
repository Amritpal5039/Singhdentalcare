"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";

export default function SystemCheckPage() {
  const [status, setStatus] = useState<any>(null);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch("/api/auth/get-session"); // Better Auth internal endpoint
        const data = await res.json();
        setSession(data);
      } catch (err) {
        console.error(err);
      }
    }
    check();
  }, []);

  return (
    <div className="p-10 font-mono text-sm">
      <h1 className="text-xl font-bold mb-4">System Check</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <p className="font-bold">Browser Origin:</p>
          <p>{typeof window !== "undefined" ? window.location.origin : "Loading..."}</p>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <p className="font-bold">Better Auth Session Status:</p>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>

        <div className="mt-8 text-gray-500">
          <p>Note: If "session" is null, you are not logged in.</p>
          <p>Try logging in again at <a href="/admin/login" className="text-blue-500 underline">/admin/login</a></p>
        </div>
      </div>
    </div>
  );
}
