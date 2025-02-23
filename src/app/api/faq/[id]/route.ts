import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Handle POST /api/faq
export async function POST(req: Request) {
  try {
    // We expect { question, answer, userID } in the request body
    const { question, answer, userID } = await req.json();

    // 1) Create the new FAQ record
    const newFAQ = await prisma.fAQ.create({
      data: {
        question,
        answer,
        userID, // Must match your FAQ model's field
      },
    });

    // 2) Create a new Notification for the same user
    // The Notification model requires: title, message, userId, etc.
    const newNotification = await prisma.notification.create({
      data: {
        title: "New FAQ Created",
        message: `A new FAQ was created: "${question}"`,
        userId: userID, // Must match your Notification model's field
      },
    });

    return NextResponse.json(
      { message: "FAQ and Notification created", newFAQ, newNotification },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating FAQ & Notification:", error);
    return NextResponse.json({ error: "Failed to create FAQ & Notification" }, { status: 500 });
  }
}

// (Optional) Handle GET /api/faq to list all FAQs
export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Error retrieving FAQs:", error);
    return NextResponse.json({ error: "Failed to retrieve FAQs" }, { status: 500 });
  }
}