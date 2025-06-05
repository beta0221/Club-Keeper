/*
  Warnings:

  - You are about to drop the column `resendId` on the `Audiences` table. All the data in the column will be lost.
  - You are about to drop the column `assistantId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `connectionId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `scenarioId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `userClerkId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `webhookId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `webhookLink` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `lastStripeCsId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `subStatus` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `subType` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `userClerkId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `SubscriptionExtension` table. All the data in the column will be lost.
  - You are about to drop the column `durationDays` on the `SubscriptionExtension` table. All the data in the column will be lost.
  - You are about to drop the column `extendedBy` on the `SubscriptionExtension` table. All the data in the column will be lost.
  - You are about to drop the column `newEnd` on the `SubscriptionExtension` table. All the data in the column will be lost.
  - You are about to drop the column `previousEnd` on the `SubscriptionExtension` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionId` on the `SubscriptionExtension` table. All the data in the column will be lost.
  - You are about to drop the column `clerkId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resend_id]` on the table `Audiences` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_email]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_clerk_id]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerk_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resend_id` to the `Audiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `connection_id` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scenario_id` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_clerk_id` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `webhook_id` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `webhook_link` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_clerk_id` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_email` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration_days` to the `SubscriptionExtension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extended_by` to the `SubscriptionExtension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `new_end` to the `SubscriptionExtension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previous_end` to the `SubscriptionExtension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscription_id` to the `SubscriptionExtension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerk_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userClerkId_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionExtension" DROP CONSTRAINT "SubscriptionExtension_extendedBy_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionExtension" DROP CONSTRAINT "SubscriptionExtension_subscriptionId_fkey";

-- DropIndex
DROP INDEX "Audiences_resendId_key";

-- DropIndex
DROP INDEX "Subscription_userClerkId_key";

-- DropIndex
DROP INDEX "Subscription_userEmail_key";

-- DropIndex
DROP INDEX "User_clerkId_key";

-- AlterTable
ALTER TABLE "Audiences" DROP COLUMN "resendId",
ADD COLUMN     "resend_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "assistantId",
DROP COLUMN "connectionId",
DROP COLUMN "createdAt",
DROP COLUMN "scenarioId",
DROP COLUMN "updatedAt",
DROP COLUMN "userClerkId",
DROP COLUMN "webhookId",
DROP COLUMN "webhookLink",
ADD COLUMN     "assistant_id" TEXT,
ADD COLUMN     "connection_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "scenario_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_clerk_id" TEXT NOT NULL,
ADD COLUMN     "webhook_id" TEXT NOT NULL,
ADD COLUMN     "webhook_link" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "createdAt",
DROP COLUMN "endDate",
DROP COLUMN "lastStripeCsId",
DROP COLUMN "stripeCustomerId",
DROP COLUMN "subStatus",
DROP COLUMN "subType",
DROP COLUMN "updatedAt",
DROP COLUMN "userClerkId",
DROP COLUMN "userEmail",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "last_stripe_cs_id" TEXT,
ADD COLUMN     "stripe_customer_id" TEXT,
ADD COLUMN     "sub_status" TEXT NOT NULL DEFAULT 'inactive',
ADD COLUMN     "sub_stripe_id" TEXT,
ADD COLUMN     "sub_type" TEXT NOT NULL DEFAULT 'free',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_clerk_id" TEXT NOT NULL,
ADD COLUMN     "user_email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubscriptionExtension" DROP COLUMN "createdAt",
DROP COLUMN "durationDays",
DROP COLUMN "extendedBy",
DROP COLUMN "newEnd",
DROP COLUMN "previousEnd",
DROP COLUMN "subscriptionId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration_days" INTEGER NOT NULL,
ADD COLUMN     "extended_by" TEXT NOT NULL,
ADD COLUMN     "new_end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "previous_end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "subscription_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clerkId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "clerk_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Audiences_resend_id_key" ON "Audiences"("resend_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_user_email_key" ON "Subscription"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_user_clerk_id_key" ON "Subscription"("user_clerk_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerk_id_key" ON "User"("clerk_id");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_clerk_id_fkey" FOREIGN KEY ("user_clerk_id") REFERENCES "User"("clerk_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionExtension" ADD CONSTRAINT "SubscriptionExtension_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionExtension" ADD CONSTRAINT "SubscriptionExtension_extended_by_fkey" FOREIGN KEY ("extended_by") REFERENCES "User"("clerk_id") ON DELETE RESTRICT ON UPDATE CASCADE;
