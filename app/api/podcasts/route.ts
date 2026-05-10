import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import { Podcast } from "@/app/lib/models/Podcast";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const podcasts = await Podcast.find({}).sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json(podcasts, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching podcasts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
