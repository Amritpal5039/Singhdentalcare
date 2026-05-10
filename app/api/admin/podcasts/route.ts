import { auth } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import { Podcast } from "@/app/lib/models/Podcast";

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const podcasts = await Podcast.find({}).sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json(podcasts, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching admin podcasts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Permission check - using 'testimonials' permission for podcasts too as they are similar, 
    // or I could add a new 'podcasts' permission. Let's stick to 'all' or check for 'podcasts'.
    const userPerms = (session.user as any).permissions || "all";
    if (userPerms !== "all" && !userPerms.split(",").includes("podcasts") && !userPerms.split(",").includes("testimonials")) {
      return NextResponse.json({ error: "Forbidden: You don't have permission to manage podcasts" }, { status: 403 });
    }

    const { title, videoUrl, order } = await request.json();

    if (!videoUrl) {
      return NextResponse.json({ error: "Video URL is required" }, { status: 400 });
    }

    const videoId = getYouTubeId(videoUrl);
    if (!videoId) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    await connectDB();
    const podcast = await Podcast.create({
      title,
      videoUrl,
      videoId,
      order: order || 0,
    });

    return NextResponse.json(podcast, { status: 201 });
  } catch (error: any) {
    console.error("Error creating podcast:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
