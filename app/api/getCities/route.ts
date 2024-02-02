import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * Obsługuje żądanie GET w celu pobrania listy miast.
 *
 * @swagger
 * /api/cities:
 *   get:
 *     summary: Pobierz listę miast
 *     description: Pobiera listę wszystkich miast z bazy danych.
 *     responses:
 *       200:
 *         description: Sukces - zwraca listę miast
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/City'
 *       500:
 *         description: Wystąpił błąd serwera
 */

export async function GET(request: NextRequest) {
  let cities;

  try {
    cities = await prisma.city.findMany();
  } catch (error) {
    return NextResponse.json(
      { message: "Błąd podczas pobierania miast" },
      { status: 500 }
    );
  }

  return NextResponse.json({ data: cities }, { status: 200 });
}
