/*
  Warnings:

  - A unique constraint covering the columns `[provider_id]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Auth_provider_id_key" ON "Auth"("provider_id");
