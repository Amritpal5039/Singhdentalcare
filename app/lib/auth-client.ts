import { useState, useEffect } from "react";

// Custom JWT client session management mimicking Better Auth client API
export const authClient = {
  signIn: {
    email: async ({ email, password }: any) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        
        let data: any = {};
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          data = await res.json();
        } else {
          const text = await res.text();
          return { data: null, error: { message: text.substring(0, 100) || "Server returned non-JSON response" } };
        }

        if (!res.ok) {
          return { data: null, error: { message: data.error || "Login failed" } };
        }
        return { data, error: null };
      } catch (err: any) {
        return { data: null, error: { message: err.message || "An error occurred" } };
      }
    }
  },
  signOut: async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Sign out failed:", e);
    }
  },
  useSession: () => {
    const [session, setSession] = useState<any>(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
      let isMounted = true;
      async function fetchSession() {
        try {
          const res = await fetch("/api/auth/session");
          if (res.ok) {
            const data = await res.json();
            // In Better Auth, useSession hook returns `{ user, session }` as the data.
            // Setting the whole data object to state so `session.user` is defined on client.
            if (isMounted) setSession(data);
          } else {
            if (isMounted) setSession(null);
          }
        } catch (e) {
          if (isMounted) setSession(null);
        } finally {
          if (isMounted) setIsPending(false);
        }
      }
      fetchSession();
      return () => {
        isMounted = false;
      };
    }, []);

    return { data: session, isPending };
  }
};