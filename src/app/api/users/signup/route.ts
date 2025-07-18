import { connectToDB } from "@/dbConfig/dbConfig"; // AgriBloom DB connection
import  User  from "@/models/userModel";          // AgriIntel schema (with role)
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  await connectToDB();

  try {
    const reqBody = await request.json();
    const { username, email, password, role = "farmer" } = reqBody;

    // Check if user with same email or username exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const message =
        existingUser.email === email
          ? "Email already exists. Try logging in."
          : "Username already taken. Choose a different one.";
      return NextResponse.json({ message }, { status: 400 });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create and save user with role
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    // Send verification email
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: String(savedUser._id),
    });

    return NextResponse.json({
      message: "User registered successfully. Please check your email.",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
