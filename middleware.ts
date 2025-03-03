import { NextResponse, NextRequest } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin"; // Use Firebase Admin SDK

interface DecodedToken {
  id: string;
  email: string;
  role: "ADMIN" | "MODERATOR" | "USER";
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // ✅ Ensure correct token retrieval

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    // ✅ Verify token using Firebase Admin SDK
    const decodedToken = await adminAuth.verifyIdToken(token) as unknown as DecodedToken;

    if (!decodedToken) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // ✅ If user is not an admin and trying to access admin routes, redirect them
    if (req.nextUrl.pathname.startsWith("/admin") && decodedToken.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Auth Error:", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

// ✅ Apply middleware to protect dashboard & admin routes
export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };