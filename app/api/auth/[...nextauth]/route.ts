import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Pobierz informacje o uwierzytelnianiu
 *     description: Pobiera informacje o konfiguracji uwierzytelniania.
 *     responses:
 *       200:
 *         description: Sukces - zwraca informacje o uwierzytelnianiu
 *       500:
 *         description: Wystąpił błąd serwera
 *   post:
 *     summary: Wykonaj uwierzytelnianie
 *     description: Uwierzytelnia użytkownika na podstawie dostarczonych danych.
 *     responses:
 *       200:
 *         description: Sukces - pomyślnie uwierzytelniono użytkownika
 *       401:
 *         description: Nieprawidłowe dane uwierzytelniania
 */

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
