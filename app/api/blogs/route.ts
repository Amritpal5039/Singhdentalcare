import connectDB from "@/app/lib/db";
import Blog from "@/app/lib/models/Blog";
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

    // Permission check - we'll use "diseases" permission for blogs as well if a specific one isn't defined, 
    // or better, check if they have "blogs" permission.
    const userPerms = (session.user as any).permissions || "all";
    if (userPerms !== "all" && !userPerms.split(",").includes("blogs")) {
      // If "blogs" perm isn't there, maybe they have "diseases"? 
      // Let's assume there's a "blogs" permission.
      return NextResponse.json({ error: "Forbidden: You don't have permission to manage blogs" }, { status: 403 });
    }

    await connectDB();
    const { title, content, excerpt, coverImage, coverImageAlt, cloudinaryId, author, tags } = await request.json();

    if (!title || !content || !excerpt || !coverImage || !cloudinaryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const slug = slugify(title);

    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json({ error: "Blog with this title already exists" }, { status: 409 });
    }

    const blog = await Blog.create({
      title,
      slug,
      content,
      excerpt,
      coverImage,
      coverImageAlt: coverImageAlt || '',
      cloudinaryId,
      author: author || 'Singh Dental Care',
      tags: tags || [],
    });

    return NextResponse.json({ message: "Blog created successfully", blog }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating blog:", error);
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
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    let query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } }
      ];
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-content"); // Don't send full content for listing
    
    return NextResponse.json({ 
      blogs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
