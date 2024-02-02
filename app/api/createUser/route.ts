import prisma from "@/prisma/db";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

/**
 * Obsługuje żądanie POST do utworzenia nowego użytkownika.
 *
 * @swagger
 * /api/users:
 *   post:
 *     summary: Utwórz nowego użytkownika
 *     description: Tworzy nowego użytkownika na podstawie przekazanych informacji.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password1:
 *                 type: string
 *               phone:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Użytkownik został pomyślnie utworzony
 *       400:
 *         description: Użytkownik o tym adresie e-mail już istnieje
 *       500:
 *         description: Wystąpił błąd serwera
 */

export async function POST(req: Request) {
  try {
    const { name, surname, email, password1, phone, city, address } =
      await req.json();
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({
          error: "Użytkownik o tym adresie e-mail już istnieje",
        }),
        { status: 400 }
      );
    }

    const passwordHash = await hash(password1, 12);

    const createUser = await prisma.users.create({
      data: {
        privilege: {
          connect: { privilege_id: 2 },
        },
        user_info: {
          create: {
            name: name,
            surname: surname,
            phone: phone,
            address: address,
          },
        },
        email: email,
        password: passwordHash,
      },
    });

    const userCity = await prisma.user_info_city.create({
      data: {
        user_info: {
          connect: { user_info_id: createUser.user_info_id },
        },
        city: {
          connect: { city_id: +city },
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "Użytkownik został pomyślnie utworzony",
      }),
      { status: 200 }
    );
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        error: `Wystąpił błąd podczas tworzenia użytkownika: ${err.message}`,
      }),
      { status: 500 }
    );
  }
}
