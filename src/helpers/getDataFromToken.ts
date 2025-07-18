import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const secret = process.env.TOKEN_SECRET || process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT secret is not defined in environment variables");
}

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
  // other fields are ignored since we're not returning them
}

export const getDataFromToken = (request: NextRequest): string => {
  const token = request.cookies.get("token")?.value;

  // console.log("✅ Cookie received:", token);

  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decodedToken = jwt.verify(token, secret) as DecodedToken;
    return decodedToken.id; // ✅ Only returning the ID
  } catch (error: any) {
    throw new Error(error.message || "Token verification failed");
  }
};
