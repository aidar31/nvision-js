-- CreateTable
CREATE TABLE "novels" (
    "id" SERIAL NOT NULL,
    "main_title" VARCHAR(255) NOT NULL,
    "rus_title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "duration" SMALLINT,
    "cover" TEXT,
    "org_author" VARCHAR(255),
    "org_translate" VARCHAR(255),
    "publishedId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "novels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "novels" ADD CONSTRAINT "novels_publishedId_fkey" FOREIGN KEY ("publishedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
