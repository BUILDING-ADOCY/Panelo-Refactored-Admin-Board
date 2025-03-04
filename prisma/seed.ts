// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  const defaultAdminEmail = "admin@example.com";
  const defaultAdminPassword = "password123"; // Use a secure password in production

  // Check if the default admin already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: defaultAdminEmail },
  });

  if (!existingUser) {
    const hashedPassword = await argon2.hash(defaultAdminPassword);
    await prisma.user.create({
      data: {
        email: defaultAdminEmail,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    console.log("Default admin user created:", defaultAdminEmail);
  } else {
    console.log("Default admin user already exists.");
  }
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
