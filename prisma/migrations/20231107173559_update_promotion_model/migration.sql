-- AlterTable
ALTER TABLE "books" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "promotions" ADD COLUMN     "type" TEXT NOT NULL DEFAULT '0';
