import { connectToDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import CropEntry from "@/models/CropEntry";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const decoded = await getDataFromToken(req);
    const userId = decoded.id; // <-- Extract id
    const user = await User.findById(userId);

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (user.role === "admin") {
      return NextResponse.json({ error: "Admins cannot submit crop entries" }, { status: 403 });
    }

    const body = await req.json();
    const { crop, district, village, sowingDate, area, season } = body;

    const newEntry = new CropEntry({
      farmerId: user._id,
      crop,
      district,
      village,
      sowingDate,
      area,
      season,
    });

    await newEntry.save();
    return NextResponse.json({ message: "Crop entry submitted successfully" });
  } catch (error) {
    console.error("Error submitting crop entry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
