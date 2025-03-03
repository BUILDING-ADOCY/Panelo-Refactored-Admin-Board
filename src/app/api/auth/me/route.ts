import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin"; // ✅ Use adminAuth for server-side verification
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // ✅ Use Firebase Admin SDK to verify the token
    const decodedToken = await adminAuth.verifyIdToken(token);

    // ✅ Fetch user from Prisma
    const user = await prisma.user.findUnique({
      where: { firebaseId: decodedToken.uid },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}