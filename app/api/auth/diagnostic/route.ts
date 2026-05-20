import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export async function GET() {
    const headerList = await headers();
    const host = headerList.get("host");
    const proto = headerList.get("x-forwarded-proto") || "http";
    
    return Response.json({
        message: "Auth Diagnostic",
        currentOrigin: `${proto}://${host}`,
        configuredBaseURL: auth.options.baseURL,
        env: {
            BETTER_AUTH_URL: process.env.BETTER_AUTH_URL ? "SET" : "MISSING",
            VERCEL_URL: process.env.VERCEL_URL || "MISSING",
            MONGODB_URI: process.env.MONGODB_URI ? "SET" : "MISSING",
            BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? "SET" : "MISSING",
        },
        nodeVersion: process.version,
    });
}
