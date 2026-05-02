-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('TODO', 'DOING', 'DONE');

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "status" "TodoStatus" NOT NULL DEFAULT 'TODO';
