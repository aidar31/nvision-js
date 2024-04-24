/*
  Warnings:

  - You are about to drop the column `publishedId` on the `novels` table. All the data in the column will be lost.
  - Added the required column `published_id` to the `novels` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "novels" DROP CONSTRAINT "novels_publishedId_fkey";

-- AlterTable
ALTER TABLE "novels" DROP COLUMN "publishedId",
ADD COLUMN     "published_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "novels" ADD CONSTRAINT "novels_published_id_fkey" FOREIGN KEY ("published_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
