import connectDB from "@/app/lib/db";
import Disease from "@/app/lib/models/Disease";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Permission check
    const userPerms = (session.user as any).permissions || "all";
    if (userPerms !== "all" && !userPerms.split(",").includes("diseases")) {
      return NextResponse.json({ error: "Forbidden: You don't have permission to manage diseases" }, { status: 403 });
    }

    await connectDB();
    const { name, description, pictureLink, cloudinaryId } = await request.json();

    if (!name || !description || !pictureLink || !cloudinaryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const slug = slugify(name);
    const startsWithLetter = name.charAt(0).toUpperCase();

    const existingDisease = await Disease.findOne({ slug });
    if (existingDisease) {
      return NextResponse.json({ error: "Disease with this name already exists" }, { status: 409 });
    }

    const disease = await Disease.create({
      name,
      description,
      pictureLink,
      cloudinaryId,
      slug,
      startsWithLetter,
    });

    return NextResponse.json({ message: "Disease created successfully", disease }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating disease:", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const letter = searchParams.get("letter");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12"); // Default to 12 per page
    const skip = (page - 1) * limit;

    let query = {};
    if (letter) {
      if (letter === "#") {
        query = { startsWithLetter: { $not: /^[A-Z]$/i } };
      } else {
        query = { startsWithLetter: letter.toUpperCase() };
      }
    }

    const total = await Disease.countDocuments(query);
    const diseases = await Disease.find(query)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .select("name slug pictureLink"); // Include pictureLink for management view
    
    return NextResponse.json({ 
      diseases,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching diseases:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}