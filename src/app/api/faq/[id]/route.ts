// src/app/api/faq/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/faq/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const faqId = parseInt(params.id, 10);
    const faq = await prisma.fAQ.findUnique({
      where: { id: faqId },
    });
    if (!faq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }
    return NextResponse.json(faq);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH /api/faq/[id]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const faqId = parseInt(params.id, 10);
    const { question, answer } = await request.json();

    const updatedFAQ = await prisma.fAQ.update({
      where: { id: faqId },
      data: { question, answer },
    });
    return NextResponse.json(updatedFAQ);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/faq/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const faqId = parseInt(params.id, 10);
    await prisma.fAQ.delete({
      where: { id: faqId },
    });
    return NextResponse.json({ message: "FAQ deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}