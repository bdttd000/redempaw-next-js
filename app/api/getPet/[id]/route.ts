import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

/**
 * Obsługuje żądanie GET w celu pobrania informacji o zwierzaku na podstawie jego identyfikatora.
 *
 * @swagger
 * /api/pets/{id}:
 *   get:
 *     summary: Pobierz informacje o zwierzaku
 *     description: Pobiera informacje o zwierzaku na podstawie przekazanego identyfikatora.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identyfikator zwierzaka
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sukces - zwraca informacje o zwierzaku
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Nie znaleziono zwierzaka o podanym identyfikatorze
 *       500:
 *         description: Wystąpił błąd serwera
 */

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const pet = await prisma.pet.findFirst({
      where: {
        pet_id: id,
      },
      include: {
        pet_info: {
          select: {
            name: true,
            description: true,
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
        user: {
          select: {
            user_info: {
              select: {
                name: true,
                surname: true,
                phone: true,
                address: true,
              },
            },
          },
        },
      },
    });

    if (!pet) {
      return NextResponse.json(
        { message: "Nie znaleziono rekordów" },
        { status: 404 }
      );
    }

    const result = {
      pet_id: pet.pet_id,
      name: pet.pet_info.name,
      directory_url: pet.pet_info.directory_url,
      avatar_url: pet.pet_info.avatar_url,
      description: pet.pet_info.description,
      photos: pet.pet_info.photos.map(
        (photo: { photo_id: any; photo_url: any }) => ({
          photo_id: photo.photo_id,
          photo_url: photo.photo_url,
        })
      ),
      user_info: {
        name: pet.user.user_info.name,
        surname: pet.user.user_info.surname,
        phone: pet.user.user_info.phone,
        address: pet.user.user_info.address,
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving car data" },
      { status: 500 }
    );
  }
}
