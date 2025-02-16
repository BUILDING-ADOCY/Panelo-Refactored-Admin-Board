// src/app/api/faq/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/faq - list all FAQs
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

// POST /api/faq - create a new FAQ
export async function POST(request: Request) {
  try {
    // Extract question, answer, and userID from the request body
    // (Remove 'createdBy' since it's not in your FAQ model)
    const { question, answer, userID } = await request.json();

    // Create a new FAQ with only the fields that exist in your schema
    const newFAQ = await prisma.fAQ.create({
      data: { question, answer, userID },
    });

    return NextResponse.json(newFAQ, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}