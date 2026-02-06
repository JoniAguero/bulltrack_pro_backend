/*
  Warnings:

  - You are about to drop the column `bull_score` on the `Favorite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bull" ADD COLUMN     "bull_score" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "bull_score";
