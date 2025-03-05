import { NextResponse, NextRequest } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin"; // Use Firebase Admin SDK

interface DecodedToken {
  uid: string;
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
    const decodedToken = await adminAuth.verifyIdToken(token);

    if (!decodedToken) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // ✅ If user is trying to access `/admin`, ensure they have ADMIN role
    if (req.nextUrl.pathname.startsWith("/admin") && decodedToken.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to home if not admin
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Auth Error:", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

// ✅ Apply middleware to all protected routes except `/auth`
export const config = { matcher: ["/((?!auth).*)"] };