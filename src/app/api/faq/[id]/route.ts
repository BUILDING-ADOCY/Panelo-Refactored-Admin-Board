// app/api/faq/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust if needed
import { getSocketInstance } from "../../socket";

export async function POST(req: Request) {
  try {
    // Expecting { question, answer, userId } in the request body
    const { question, answer } = await req.json();

    // 1) Store the FAQ in DB
    const newFaq = await prisma.fAQ.create({
      data: {
        question,
        answer,
        // userId, // Make sure this matches the field name in your Prisma schema
      },
    });

    // 2) Create a notification
    const notification = await prisma.notification.create({
      data: {
        title: "New FAQ Added",
        message: `A new FAQ: "${question}" has been added.`,
        category: "update",
        isRead: false,
        userId, // Again, ensure this matches your Notification model field
        createdAt: new Date(),
      },
    });

    // 3) Emit real-time notification
    const io = getSocketInstance(); // Make sure initSocket() has run somewhere
    io.emit("new_notification", notification);

    return NextResponse.json({ message: "FAQ added!", newFaq });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add FAQ" }, { status: 500 });
  }
}