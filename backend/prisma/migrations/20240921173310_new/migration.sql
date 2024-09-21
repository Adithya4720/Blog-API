/*
  Warnings:

  - Added the required column `Comment` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dislikes` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "Comment" TEXT NOT NULL,
ADD COLUMN     "dislikes" TEXT NOT NULL,
ADD COLUMN     "likes" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "liked" TEXT[];
