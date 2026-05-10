import { auth } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import { Appointment } from "@/app/lib/models/Appointment";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Permission check
    const userPerms = (session.user as any).permissions || "all";
    if (userPerms !== "all" && !userPerms.split(",").includes("appointments")) {
      return NextResponse.json({ error: "Forbidden: You don't have permission to manage appointments" }, { status: 403 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter"); // "all", "contacted", "non-contacted"
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    let query: any = {};

    if (filter === "contacted") {
      query.isContacted = true;
    } else if (filter === "non-contacted") {
      query.isContacted = false;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const appointments = await Appointment.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(appointments, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
