import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

/**
 * Obsługuje żądanie POST w celu dodania nowego zdjęcia zwierzaka.
 *
 * @swagger
 * /api/photos:
 *   post:
 *     summary: Dodaj nowe zdjęcie zwierzaka
 *     description: Dodaje nowe zdjęcie zwierzaka na podstawie przekazanych informacji.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pet_info_id:
 *                 type: string
 *               photo_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sukces - zdjęcie zostało pomyślnie dodane
 *       500:
 *         description: Wystąpił błąd serwera
 */

export async function POST(req: NextRequest) {
  try {
    const { pet_info_id, photo_url } = await req.json();
    const info = await prisma.photos.create({
      data: {
        pet_info_id,
        photo_url,
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "Zdjęcie zostało dodane",
      }),
      { status: 200 }
    );
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        error: `Wystąpił błąd podczas dodawania zdjęć: ${err.message}`,
      }),
      { status: 500 }
    );
  }
}
