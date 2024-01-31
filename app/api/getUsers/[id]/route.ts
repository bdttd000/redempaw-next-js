import { NextResponse } from "next/server";
import prisma from "@/prisma/db";

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
