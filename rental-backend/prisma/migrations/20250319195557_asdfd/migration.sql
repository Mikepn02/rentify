/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerNight` on the `Property` table. All the data in the column will be lost.
  - Added the required column `area` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bathrooms` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedrooms` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "imageUrl",
DROP COLUMN "pricePerNight",
ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "bathrooms" INTEGER NOT NULL,
ADD COLUMN     "bedrooms" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Agent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "likedBy" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "about" TEXT NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);
