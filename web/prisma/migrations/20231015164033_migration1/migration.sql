/*
  Warnings:

  - The primary key for the `CustomizationSettings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `color` on the `CustomizationSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomizationSettings" DROP CONSTRAINT "CustomizationSettings_pkey",
DROP COLUMN "color",
ADD COLUMN     "formBorderRadius" TEXT NOT NULL DEFAULT '5px',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CustomizationSettings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CustomizationSettings_id_seq";
