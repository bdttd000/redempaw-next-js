import { writeFile, mkdirSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

/**
 * Obsługuje żądanie POST w celu przesłania pliku i zapisania go na serwerze.
 *
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Prześlij plik
 *     description: Przesyła plik i zapisuje go na serwerze w określonym katalogu pod nazwą pliku.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               imageId:
 *                 type: string
 *               directory:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sukces - plik został pomyślnie przesłany i zapisany
 *       400:
 *         description: Błąd - nieprawidłowe dane żądania
 */

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const fileName: string | null = data.get("imageId") as unknown as string;
  const directory: string | null = data.get("directory") as unknown as string;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const dir = join(process.cwd(), "public", directory);
  mkdirSync(dir, { recursive: true });

  const path = join(dir, fileName + ".jpg");
  writeFile(path, buffer, "utf8", (err) => {
    if (err) throw err;
  });

  return NextResponse.json({ success: true });
}
