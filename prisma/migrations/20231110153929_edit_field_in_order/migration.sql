/*
  Warnings:

  - Made the column `userId` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "orderType" DROP NOT NULL;
