import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true }, { status: 200 });
  
  // Clear cookie by deleting it
  response.cookies.set({
    name: "sdc_session",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0), // Expire immediately
    path: "/",
  });
  
  return response;
}
