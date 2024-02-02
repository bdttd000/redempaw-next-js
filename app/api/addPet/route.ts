import prisma from "@/prisma/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

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
        user_id: "014b5fb4-3fe1-48cb-91dd-e5e17d7f1e54",
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
