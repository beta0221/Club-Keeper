/*
  Warnings:

  - You are about to drop the column `resend_id` on the `Audiences` table. All the data in the column will be lost.
  - You are about to drop the column `assistant_id` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `connection_id` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `scenario_id` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `user_clerk_id` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `webhook_id` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `last_stripe_cs_id` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_customer_id` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `sub_status` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `sub_type` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `user_clerk_id` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `SubscriptionExtension` table. All the data in the column will be lost.
  - You are about to drop the column `duration_days` on the `SubscriptionExtension` table. All the data in the column will be lost.
  - You are about to drop the column `extended_by` on the `SubscriptionExtension` table. All the data in the column will be lost.
  - You are about to drop the column `new_end` on the `SubscriptionExtension` table. All the data in the column will be lost.
  - You are about to drop the column `previous_end` on the `SubscriptionExtension` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_id` on the `SubscriptionExtension` table. All the data in the column will be lost.
  - You are about to drop the column `clerk_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resendId]` on the table `Audiences` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userEmail]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userClerkId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resendId` to the `Audiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `connectionId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scenarioId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userClerkId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `webhookId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userClerkId` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationDays` to the `SubscriptionExtension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extendedBy` to the `SubscriptionExtension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newEnd` to the `SubscriptionExtension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previousEnd` to the `SubscriptionExtension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionId` to the `SubscriptionExtension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_user_clerk_id_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionExtension" DROP CONSTRAINT "SubscriptionExtension_extended_by_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionExtension" DROP CONSTRAINT "SubscriptionExtension_subscription_id_fkey";

-- DropIndex
DROP INDEX "Audiences_resend_id_key";

-- DropIndex
DROP INDEX "Subscription_user_clerk_id_key";

-- DropIndex
DROP INDEX "Subscription_user_email_key";

-- DropIndex
DROP INDEX "User_clerk_id_key";

-- AlterTable
ALTER TABLE "Audiences" DROP COLUMN "resend_id",
ADD COLUMN     "resendId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "assistant_id",
DROP COLUMN "connection_id",
DROP COLUMN "scenario_id",
DROP COLUMN "user_clerk_id",
DROP COLUMN "webhook_id",
ADD COLUMN     "assistantId" TEXT,
ADD COLUMN     "connectionId" TEXT NOT NULL,
ADD COLUMN     "scenarioId" TEXT NOT NULL,
ADD COLUMN     "userClerkId" TEXT NOT NULL,
ADD COLUMN     "webhookId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "created_at",
DROP COLUMN "end_date",
DROP COLUMN "last_stripe_cs_id",
DROP COLUMN "stripe_customer_id",
DROP COLUMN "sub_status",
DROP COLUMN "sub_type",
DROP COLUMN "updated_at",
DROP COLUMN "user_clerk_id",
DROP COLUMN "user_email",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "lastStripeCsId" TEXT,
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "subStatus" TEXT NOT NULL DEFAULT 'inactive',
ADD COLUMN     "subType" TEXT NOT NULL DEFAULT 'free',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userClerkId" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubscriptionExtension" DROP COLUMN "created_at",
DROP COLUMN "duration_days",
DROP COLUMN "extended_by",
DROP COLUMN "new_end",
DROP COLUMN "previous_end",
DROP COLUMN "subscription_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "durationDays" INTEGER NOT NULL,
ADD COLUMN     "extendedBy" TEXT NOT NULL,
ADD COLUMN     "newEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "previousEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "subscriptionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clerk_id",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "clerkId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Audiences_resendId_key" ON "Audiences"("resendId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userEmail_key" ON "Subscription"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userClerkId_key" ON "Subscription"("userClerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userClerkId_fkey" FOREIGN KEY ("userClerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionExtension" ADD CONSTRAINT "SubscriptionExtension_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionExtension" ADD CONSTRAINT "SubscriptionExtension_extendedBy_fkey" FOREIGN KEY ("extendedBy") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
