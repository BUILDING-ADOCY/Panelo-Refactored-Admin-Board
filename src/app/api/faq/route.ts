import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/faq - List all FAQs
export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(faqs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/faq - Create a new FAQ
export async function POST(request: Request) {
  try {
    const { question, answer, userID } = await request.json();

    const newFAQ = await prisma.fAQ.create({
      data: { question, answer, userID },
    });

    return NextResponse.json(newFAQ, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}