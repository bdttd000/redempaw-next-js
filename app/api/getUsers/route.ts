import { NextResponse } from "next/server";
import prisma from "@/prisma/db";

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
