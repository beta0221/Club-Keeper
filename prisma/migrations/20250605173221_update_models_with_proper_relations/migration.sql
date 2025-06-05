/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `sub_stripe_id` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Subscription` table. All the data in the column will be lost.
  - The `sub_status` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[clerk_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerk_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_user_clerk_id_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionExtension" DROP CONSTRAINT "SubscriptionExtension_extended_by_fkey";

-- DropIndex
DROP INDEX "Subscription_last_stripe_cs_id_key";

-- DropIndex
DROP INDEX "Subscription_stripe_customer_id_key";

-- DropIndex
DROP INDEX "SubscriptionExtension_extended_by_idx";

-- DropIndex
DROP INDEX "SubscriptionExtension_subscription_id_idx";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "createdAt",
DROP COLUMN "sub_stripe_id",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "sub_status",
ADD COLUMN     "sub_status" TEXT NOT NULL DEFAULT 'inactive',
ALTER COLUMN "sub_type" SET DEFAULT 'free',
ALTER COLUMN "last_stripe_cs_id" DROP NOT NULL,
ALTER COLUMN "stripe_customer_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "clerk_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_clerk_id_key" ON "User"("clerk_id");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_clerk_id_fkey" FOREIGN KEY ("user_clerk_id") REFERENCES "User"("clerk_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionExtension" ADD CONSTRAINT "SubscriptionExtension_extended_by_fkey" FOREIGN KEY ("extended_by") REFERENCES "User"("clerk_id") ON DELETE RESTRICT ON UPDATE CASCADE;
