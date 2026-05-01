"use client";

import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

function getAuthErrorMessage(ctx: unknown) {
  if (!ctx || typeof ctx !== "object") {
    return "Sign up failed. Please try again.";
  }

  const error = "error" in ctx ? ctx.error : undefined;

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string" && error.message.trim()) {
      return error.message;
    }

    if ("statusText" in error && typeof error.statusText === "string" && error.statusText.trim()) {
      return error.statusText;
    }
  }

  return "Sign up failed. Please check your details and try again.";
}

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
          image: "",
          callbackURL: "/",
        },
        {
          onRequest: () => {
            console.log("Signing up...");
          },
          onSuccess: () => {
            router.push("/Profile");
          },
          onError: (ctx) => {
            alert(getAuthErrorMessage(ctx));
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-4 p-6 border rounded-lg shadow-md w-full max-w-md"
      >
        <label>Name:</label>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-2 rounded"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
