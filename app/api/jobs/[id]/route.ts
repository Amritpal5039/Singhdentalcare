import connectDB from "@/app/lib/db";
import Job from "@/app/lib/models/job";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unwrappedParams = await params;
    await connectDB();
    const job = await Job.findById(unwrappedParams.id);
    
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ job }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching job:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const unwrappedParams = await params;
    const body = await request.json();
    await connectDB();
    
    const updatedJob = await Job.findByIdAndUpdate(
      unwrappedParams.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ job: updatedJob }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating job:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const unwrappedParams = await params;
    await connectDB();
    
    const deletedJob = await Job.findByIdAndDelete(unwrappedParams.id);
    
    if (!deletedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
