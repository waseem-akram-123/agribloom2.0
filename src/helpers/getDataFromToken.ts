import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const secret = (process.env.TOKEN_SECRET || process.env.JWT_SECRET) as string;

if (!secret) {
  throw new Error("JWT secret is not defined in environment variables");
}

interface DecodedToken {
  id: string;
  role: "admin" | "farmer";
  iat: number;
  exp: number;
}

// Helper for API routes to decode token string directly
export const decodeTokenString = (token: string): DecodedToken => {
  if (!token) {
    throw new Error("No token provided");
  }
  try {
    const decodedToken = jwt.verify(token, secret) as unknown as DecodedToken;
    return decodedToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Token verification failed");
    }
    throw new Error("Token verification failed");
  }
};

export const getDataFromToken = (request: NextRequest): DecodedToken => {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decodedToken = jwt.verify(token, secret) as unknown as DecodedToken;
    return decodedToken;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Token verification failed");
    }
    throw new Error("Token verification failed");
  }
};
