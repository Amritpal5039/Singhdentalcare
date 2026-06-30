import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/app/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session) {
      return NextResponse.json(null, { status: 401 });
    }
    // Return { user, session }
    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    console.error("Session API error:", error);
    return NextResponse.json(null, { status: 500 });
  }
}
