import { prisma } from "@/lib/prisma"; // Ensure Prisma is imported
import { NextResponse } from "next/server";
import { getSocketInstance } from "@/app/api/socket"; // Import WebSocket

export async function POST(req: Request) {
  try {
    const { question, answer, createdBy } = await req.json();

    // ✅ Store the FAQ in the database
    const newFaq = await prisma.faq.create({
      data: {
        question,
        answer,
        createdBy,
      },
    });

    // ✅ Generate Notification for the New FAQ
    const notification = await prisma.notification.create({
      data: {
        title: "New FAQ Added",
        message: `A new FAQ has been added successfully: "${question}".`,
        category: "update",
        isRead: false,
        userId: createdBy, // Ensure you pass a valid admin ID
        createdAt: new Date(), // Store Date & Time
      },
    });

    // ✅ Emit Real-Time Notification
    const io = getSocketInstance();
    io.emit("new_notification", notification);

    return NextResponse.json({ message: "FAQ added and notification sent!", newFaq });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add FAQ" }, { status: 500 });
  }
}