import connectDB from "@/app/lib/db";
import Job from "@/app/lib/models/job";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    
    const { title, type, branch, deadline, openings, description, questions } = body;

    if (!title || !type || !branch || !deadline || !openings || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const job = await Job.create({
      title,
      type,
      branch,
      deadline,
      openings,
      description,
      questions: questions || [],
    });

    return NextResponse.json({ message: "Job created successfully", job }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating job:", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error.message
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");

    let query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { branch: { $regex: search, $options: "i" } }
      ];
    }

    // Check if user is admin
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      // Public view: only show non-hidden jobs with deadline in the future
      query.isHidden = { $ne: true };
      query.deadline = { $gte: new Date() };
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
