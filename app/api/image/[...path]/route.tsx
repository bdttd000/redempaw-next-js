import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * Obsługuje żądanie GET w celu pobrania obrazu z serwera na podstawie ścieżki.
 *
 * @swagger
 * /api/images/{path}:
 *   get:
 *     summary: Pobierz obraz
 *     description: Pobiera obraz z serwera na podstawie podanej ścieżki.
 *     parameters:
 *       - in: path
 *         name: path
 *         required: true
 *         description: Ścieżka do obrazu
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sukces - zwraca obraz
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Nie znaleziono obrazu o podanej ścieżce
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  let [folder_path, image_name] = params.path;
  image_name = image_name + ".jpg";

  let filePath = path.join(process.cwd(), "public", folder_path, image_name);

  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: { "Content-Type": "image/jpeg" },
    });
  }
}
