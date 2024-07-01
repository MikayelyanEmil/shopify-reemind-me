/*
  Warnings:

  - You are about to drop the column `formBorderRadius` on the `CustomizationSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomizationSettings" DROP COLUMN "formBorderRadius",
ADD COLUMN     "buttonBorderRadius" TEXT NOT NULL DEFAULT '5px',
ADD COLUMN     "buttonColor" TEXT NOT NULL DEFAULT 'navy',
ADD COLUMN     "formColor" TEXT NOT NULL DEFAULT 'blue';
