import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const pets = await prisma.pet.findMany({
      orderBy: {
        creation_date: "desc",
      },
      include: {
        pet_info: {
          select: {
            name: true,
            directory_url: true,
            avatar_url: true,
            photos: {
              select: {
                photo_id: true,
                photo_url: true,
              },
            },
          },
        },
      },
    });

    const result = pets.map(
      (pet: {
        pet_id: string;
        pet_info: {
          name: any;
          directory_url: string;
          avatar_url: string;
          photos: any[];
        };
      }) => ({
        pet_id: pet.pet_id,
        name: pet.pet_info.name,
        directory_url: pet.pet_info.directory_url,
        avatar_url: pet.pet_info.avatar_url,
        photos: pet.pet_info.photos.map(
          (photo: { photo_id: string; photo_url: string }) => ({
            photo_id: photo.photo_id,
            photo_url: photo.photo_url,
          })
        ),
      })
    );

    return NextResponse.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      data: "Wystąpił błąd podczas pobierania danych",
    });
  }
}
