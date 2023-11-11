-- AlterTable
ALTER TABLE "order_details" ADD COLUMN "quantity" DECIMAL(65,30) DEFAULT 1;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN "email" TEXT,
ALTER COLUMN "fullName" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN "address" TEXT NOT NULL DEFAULT '';
