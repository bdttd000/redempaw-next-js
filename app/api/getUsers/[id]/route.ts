import { NextResponse } from "next/server";
import prisma from "@/prisma/db";

/**
 * Obsługuje żądanie GET w celu pobrania informacji o użytkowniku na podstawie jego identyfikatora.
 *
 * @swagger
 * /api/getUsers/{id}:
 *   get:
 *     summary: Pobierz informacje o użytkowniku
 *     description: Pobiera informacje o użytkowniku na podstawie przekazanego identyfikatora.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identyfikator użytkownika
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sukces - zwraca informacje o użytkowniku
 *       404:
 *         description: Nie znaleziono użytkownika o podanym identyfikatorze
 *       500:
 *         description: Wystąpił błąd serwera
 */

export const GET = async (req: Request, res: Response) => {
  try {
    const id = req.url.split("getUsers/")[1];
    const user = await prisma.users.findUnique({
      where: { user_id: id },
    });
    if (!user) {
      return NextResponse.json({ message: "ERROR" }, { status: 404 });
    }
    return NextResponse.json({ message: "OK", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "ERROR", error }, { status: 500 });
  }
};
