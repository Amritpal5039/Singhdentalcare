import connectDB from "@/app/lib/db";
import JobApplication from "@/app/lib/models/jobApplication";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unwrappedParams = await params;
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const applications = await JobApplication.find({ jobId: unwrappedParams.id }).sort({ createdAt: -1 });
    
    return NextResponse.json({ applications }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching job applications:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
