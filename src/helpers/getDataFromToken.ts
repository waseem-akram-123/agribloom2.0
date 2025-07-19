import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const secret = process.env.TOKEN_SECRET || process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT secret is not defined in environment variables");
}

interface DecodedToken {
  id: string;
  role: "admin" | "farmer"; // ✅ Add role
  iat: number;
  exp: number;
}

export const getDataFromToken = (request: NextRequest): DecodedToken => {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decodedToken = jwt.verify(token, secret) as DecodedToken;
    return decodedToken; // ✅ Return full decodedToken
  } catch (error: any) {
    throw new Error(error.message || "Token verification failed");
  }
};
