import { NextRequest, NextResponse } from "next/server";
import CropEntry from "@/models/CropEntry";
import { connectToDB } from "@/dbConfig/dbConfig";

export async function POST(req: NextRequest) {
  try {
    await connectToDB(); // ensure DB is connected

    const body = await req.json();

    const { farmerId, crop, district, village, sowingDate, area, season } = body;

    if (!farmerId || !crop || !district || !village || !sowingDate || !area || !season) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const entry = new CropEntry({
      farmerId,
      crop,
      district,
      village,
      sowingDate,
      area,
      season,
    });

    await entry.save();

    return NextResponse.json({ message: "Crop entry saved" }, { status: 201 });
  } catch (error) {
    console.error("POST /api/crop-entry error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
