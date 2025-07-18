import { NextResponse } from "next/server";
import { connectToDB } from "@/dbConfig/dbConfig";
import Crop from "@/models/CropEntry";

export async function GET() {
  try {
    await connectToDB();

    const trendData = await Crop.aggregate([
      {
        $group: {
          _id: "$crop",
          totalEntries: { $sum: 1 },
          averageArea: { $avg: "$area" },
        },
      },
      {
        $project: {
          crop: "$_id",
          totalEntries: 1,
          averageArea: { $round: ["$averageArea", 2] },
          _id: 0,
        },
      },
      { $sort: { totalEntries: -1 } },
    ]);

    return NextResponse.json(trendData);
  } catch (err) {
    console.error("Error fetching crop trends:", err);
    return NextResponse.json(
      { error: "Failed to fetch crop trends" },
      { status: 500 }
    );
  }
}
