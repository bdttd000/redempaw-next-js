import { NextResponse } from "next/server";
import prisma from "@/prisma/db";

/**
 * Obsługuje żądanie GET w celu pobrania listy użytkowników.
 *
 * @swagger
 * /api/users:
 *   get:
 *     summary: Pobierz listę użytkowników
 *     description: Pobiera listę wszystkich użytkowników z bazy danych.
 *     responses:
 *       200:
 *         description: Sukces - zwraca listę użytkowników
 *       500:
 *         description: Wystąpił błąd serwera
 */

export const GET = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.users.findMany();
    return NextResponse.json({ message: "OK", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "ERROR", error },
      {
        status: 500,
      }
    );
  }
};
