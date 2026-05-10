import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import { Appointment } from "@/app/lib/models/Appointment";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Basic validation
    const { name, phoneNumber, location, treatment } = data;
    if (!name || !phoneNumber || !location || !treatment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();
    const appointment = await Appointment.create(data);

    return NextResponse.json({ success: true, id: appointment._id }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
