import connectDB from "@/app/lib/db";
import Disease from "@/app/lib/models/Disease";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q");

    if (!q) {
      return NextResponse.json({ diseases: [] }, { status: 200 });
    }

    // Case-insensitive regex search for names containing the query
    const query = { name: { $regex: q, $options: "i" } };
    const diseases = await Disease.find(query).sort({ name: 1 }).select("name slug").limit(10);
    
    return NextResponse.json({ diseases }, { status: 200 });
  } catch (error: any) {
    console.error("Error searching diseases:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}