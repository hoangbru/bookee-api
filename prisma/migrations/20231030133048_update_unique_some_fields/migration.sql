/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `genres` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `promotions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `fullName` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orderType` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "fullName" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "orderType" SET NOT NULL,
ALTER COLUMN "orderType" SET DEFAULT '0';

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "genres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "orders_code_key" ON "orders"("code");

-- CreateIndex
CREATE UNIQUE INDEX "promotions_name_key" ON "promotions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
