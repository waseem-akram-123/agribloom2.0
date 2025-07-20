// /app/api/farmer/trends/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/dbConfig/dbConfig";
import CropEntryModel, { ICropEntry } from "@/models/CropEntry";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const { id: userId, role } = await getDataFromToken(request);
    let entries: ICropEntry[] = [];

    if (role === "admin") {
      // Admin sees all crop entries
      entries = await CropEntryModel.find();
    } else {
      // Farmer: get their district
      const farmerEntries = await CropEntryModel.find({ farmerId: userId });
      if (farmerEntries.length === 0) return NextResponse.json([]);
      const district = farmerEntries[0].district;

      // Get all crop entries in same district
      entries = await CropEntryModel.find({ district });
    }

    // Group crops
    const cropMap = new Map<string, { area: number; entries: ICropEntry[] }>();
    let totalAreaAllCrops = 0;

    for (const entry of entries) {
      totalAreaAllCrops += entry.area;
      const key = entry.crop;
      const prev = cropMap.get(key);
      if (prev) {
        prev.area += entry.area;
        prev.entries.push(entry);
      } else {
        cropMap.set(key, { area: entry.area, entries: [entry] });
      }
    }

    const trends = Array.from(cropMap, ([crop, { area, entries }]) => {
      const totalEntries = entries.length;
      const averageArea = totalEntries > 0 ? area / totalEntries : 0;
      const percentage =
        totalAreaAllCrops > 0 ? (area / totalAreaAllCrops) * 100 : 0;

      // If there are multiple villages, you can list them all, or just show the first one.
      // Here, we show the first village for simplicity.
      return {
        crop,
        totalEntries,
        totalArea: area,
        averageArea,
        percentage,
        district: entries[0].district,
        village: entries[0].village, // <-- Add this line to include village
      };
    });

    return NextResponse.json(trends);
  } catch (error) {
    console.error("Error fetching crop trends:", error);
    return NextResponse.json([], { status: 500 });
  }
}
