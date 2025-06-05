-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "end_date" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "SubscriptionExtension" (
    "id" TEXT NOT NULL,
    "subscription_id" TEXT NOT NULL,
    "extended_by" TEXT NOT NULL,
    "previous_end" TIMESTAMP(3) NOT NULL,
    "new_end" TIMESTAMP(3) NOT NULL,
    "duration_days" INTEGER NOT NULL,
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubscriptionExtension_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SubscriptionExtension_subscription_id_idx" ON "SubscriptionExtension"("subscription_id");

-- CreateIndex
CREATE INDEX "SubscriptionExtension_extended_by_idx" ON "SubscriptionExtension"("extended_by");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_clerk_id_fkey" FOREIGN KEY ("user_clerk_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionExtension" ADD CONSTRAINT "SubscriptionExtension_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionExtension" ADD CONSTRAINT "SubscriptionExtension_extended_by_fkey" FOREIGN KEY ("extended_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
