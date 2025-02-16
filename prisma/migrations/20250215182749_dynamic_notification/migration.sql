/*
  Warnings:

  - Added the required column `userID` to the `FAQ` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FAQ" ADD COLUMN     "userID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "category" SET DEFAULT 'update';
