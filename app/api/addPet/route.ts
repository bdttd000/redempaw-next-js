import prisma from "@/prisma/db";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/pet:
 *   post:
 *     summary: Add a new pet
 *     description: Creates a new pet entry with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pet_info_id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               directory_url:
 *                 type: string
 *               avatar_url:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pet successfully added
 *       500:
 *         description: Internal Server Error
 */

export async function POST(req: Request) {
  try {
    const { pet_info_id, name, description, directory_url, avatar_url, city } =
      await req.json();

    const createdPetInfo = await prisma.pet_info.create({
      data: {
        pet_info_id: pet_info_id,
        name: name,
        description: description,
        directory_url: directory_url,
        avatar_url: avatar_url,
      },
    });

    const createdPet = await prisma.pet.create({
      data: {
        user_id: "e726d500-5aa6-4637-b016-9888942712cd",
        pet_info_id: createdPetInfo.pet_info_id,
      },
    });

    const createdCarCity = await prisma.pet_city.create({
      data: {
        pet_id: createdPet.pet_id,
        city_id: +city,
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "Pojazd został pomyślnie dodany",
      }),
      { status: 200 }
    );
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        error: `Wystąpił błąd podczas dodawania pojazdu: ${err.message}`,
      }),
      { status: 500 }
    );
  }
}
