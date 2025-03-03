import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/faq/[id] - Retrieve a single FAQ by ID
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
    return NextResponse.json(faq, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/faq/[id] - Update an existing FAQ
export async function PUT(
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
    return NextResponse.json(updatedFAQ, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/faq/[id] - Delete an FAQ
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const faqId = parseInt(params.id, 10);
    const deletedFAQ = await prisma.fAQ.delete({
      where: { id: faqId },
    });
    return NextResponse.json(deletedFAQ, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}