-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "writer" TEXT,
    "coverImage" TEXT,
    "point" INTEGER NOT NULL,
    "tag" TEXT[],

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
