import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/auth";
import argon2 from "argon2";
import cookie from "cookie";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing email or password" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Hash the password using argon2
    const hashedPassword = await argon2.hash(password);

    // Create user with default role USER
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role: "USER" },
    });

    // Generate JWT token
    const token = generateToken(user);

    // Set JWT token in HTTP-only cookie
    const response = new Response(JSON.stringify({ message: "Signup successful" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
    response.headers.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600, // 1 hour
        path: "/",
      })
    );

    return response;
  } catch (error) {
    console.error("Signup Error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
