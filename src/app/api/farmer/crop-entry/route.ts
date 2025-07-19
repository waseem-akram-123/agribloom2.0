import { NextRequest, NextResponse } from "next/server";
import CropEntry from "@/models/CropEntry";
import { connectToDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken"; // ✅ Use token to get ID

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const user = await getDataFromToken(req); // ✅ Decode JWT from cookie
    const farmerId = user.id; // ✅ Get MongoDB ID from token

    const body = await req.json();
    const { crop, district, village, sowingDate, area, season } = body;

    if (!crop || !district || !village || !sowingDate || !area || !season) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const entry = new CropEntry({
      farmerId, // ✅ taken securely from token
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
    console.error("POST /api/farmer/crop-entry error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
