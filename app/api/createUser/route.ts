import prisma from "@/prisma/db";
import { NextResponse } from "next/server";
import hash256 from "@/utils/hash";

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
        password: hash256(password1),
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
