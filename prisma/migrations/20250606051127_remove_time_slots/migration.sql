/*
  Warnings:

  - You are about to drop the column `slot_id` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the `TimeSlot` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `end_time` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_slot_id_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "slot_id",
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "TimeSlot";
