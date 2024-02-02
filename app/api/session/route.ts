import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * Obsługuje żądanie GET w celu sprawdzenia sesji użytkownika.
 *
 * @swagger
 * /api/session:
 *   get:
 *     summary: Sprawdź sesję użytkownika
 *     description: Sprawdza czy użytkownik jest zalogowany i zwraca informacje o sesji.
 *     responses:
 *       200:
 *         description: Sukces - zwraca informacje o sesji
 *       401:
 *         description: Niezalogowany użytkownik
 */

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
