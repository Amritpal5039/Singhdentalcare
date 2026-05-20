import { auth } from "@/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const dynamic = "force-dynamic";

console.log("[Auth Route] Initializing auth handlers");

export const { POST, GET } = toNextJsHandler(auth);
