import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(request: NextRequest) {
  await connectToDB();
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findById(userId).select("-password");
    return NextResponse.json({ message: "User found", data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function PATCH(request: NextRequest) {
  await connectToDB();
  try {
    const userId = await getDataFromToken(request);
    const body = await request.json();

    const updates: any = {};

    // Only assign fields if they exist in the request body
    const fields = [
      "favoriteVegetable",
      "favoriteFruit",
      "favoriteTree",
      "favoriteFlower",
      "favoriteSeason",
      "favoriteActivity",
    ];

    fields.forEach((field) => {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    });

    // Conditionally mark profile as completed
    const requiredFields = [
      "favoriteVegetable",
      "favoriteFruit",
      "favoriteTree",
      "favoriteSeason",
      "favoriteActivity",
    ];

    const allRequiredFilled = requiredFields.every(
      (field) => body[field] && body[field].trim() !== ""
    );

    if (allRequiredFilled) {
      updates.profileCompleted = true;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");

    return NextResponse.json({ message: "Profile updated", user: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
