/*
  Warnings:

  - A unique constraint covering the columns `[user_info_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "pet" (
    "pet_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "pet_info_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pet_pkey" PRIMARY KEY ("pet_id")
);

-- CreateTable
CREATE TABLE "pet_info" (
    "pet_info_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "directory_url" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,

    CONSTRAINT "pet_info_pkey" PRIMARY KEY ("pet_info_id")
);

-- CreateTable
CREATE TABLE "photos" (
    "photo_id" TEXT NOT NULL,
    "pet_info_id" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("photo_id")
);

-- CreateTable
CREATE TABLE "city" (
    "city_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "user_info_city" (
    "user_info_id" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,

    CONSTRAINT "user_info_city_pkey" PRIMARY KEY ("user_info_id","city_id")
);

-- CreateTable
CREATE TABLE "pet_city" (
    "pet_id" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,

    CONSTRAINT "pet_city_pkey" PRIMARY KEY ("pet_id","city_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pet_pet_info_id_key" ON "pet"("pet_info_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_info_id_key" ON "users"("user_info_id");

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_pet_info_id_fkey" FOREIGN KEY ("pet_info_id") REFERENCES "pet_info"("pet_info_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_pet_info_id_fkey" FOREIGN KEY ("pet_info_id") REFERENCES "pet_info"("pet_info_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_info_city" ADD CONSTRAINT "user_info_city_user_info_id_fkey" FOREIGN KEY ("user_info_id") REFERENCES "user_info"("user_info_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_info_city" ADD CONSTRAINT "user_info_city_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_city" ADD CONSTRAINT "pet_city_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pet"("pet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_city" ADD CONSTRAINT "pet_city_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;
