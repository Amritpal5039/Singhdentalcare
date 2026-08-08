import connectDB from "@/app/lib/db";
import JobApplication from "@/app/lib/models/jobApplication";
import Job from "@/app/lib/models/job";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unwrappedParams = await params;
    await connectDB();
    const body = await request.json();
    
    const { name, phone, resumeUrl, answers } = body;

    if (!name || !phone || !resumeUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
    }

    const job = await Job.findById(unwrappedParams.id);
    if (!job) {
       return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const application = await JobApplication.create({
      jobId: unwrappedParams.id,
      name,
      phone,
      resumeUrl,
      answers: answers || [],
    });

    return NextResponse.json({ message: "Application submitted successfully", application }, { status: 201 });
  } catch (error: any) {
    console.error("Error submitting job application:", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error.message
    }, { status: 500 });
  }
}
