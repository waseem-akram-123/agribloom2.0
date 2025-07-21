// /app/api/admin/crop-entries/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/dbConfig/dbConfig";
import CropEntry from "@/models/CropEntry";

import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const { role } = getDataFromToken(req);
    if (role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const entries = await CropEntry.find().populate("farmerId", "-password");
    return NextResponse.json(entries);
  } catch {
    return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDB();
    const { role } = getDataFromToken(req);
    if (role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await req.json();
    await CropEntry.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

