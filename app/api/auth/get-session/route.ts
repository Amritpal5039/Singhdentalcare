import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/app/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    console.error("Get-Session API error:", error);
    return NextResponse.json(null, { status: 200 });
  }
}
