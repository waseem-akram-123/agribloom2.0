import { NextResponse } from "next/server";
import { connectToDB } from "@/dbConfig/dbConfig";
import Crop from "@/models/CropEntry";

export async function GET() {
  try {
    await connectToDB();

    const cropData = await Crop.aggregate([
      {
        $group: {
          _id: "$crop",
          totalEntries: { $sum: 1 },
          totalArea: { $sum: "$area" },
          averageArea: { $avg: "$area" },
        },
      },
      {
        $project: {
          crop: "$_id",
          totalEntries: 1,
          totalArea: 1,
          averageArea: { $round: ["$averageArea", 2] },
          _id: 0,
        },
      },
    ]);

    const totalArea = cropData.reduce((sum, item) => sum + item.totalArea, 0);

    const trendData = cropData.map((item) => ({
      ...item,
      percentage: Math.round((item.totalArea / totalArea) * 100), // based on acres
    })).sort((a, b) => b.totalArea - a.totalArea);

    return NextResponse.json(trendData);
  } catch (err) {
    console.error("Error fetching crop trends:", err);
    return NextResponse.json(
      { error: "Failed to fetch crop trends" },
      { status: 500 }
    );
  }
}
