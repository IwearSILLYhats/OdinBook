/*
  Warnings:

  - The `avatar` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `banner` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
ADD COLUMN     "avatar" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "banner",
ADD COLUMN     "banner" BOOLEAN NOT NULL DEFAULT false;
