"use client";

import React from "react";
import Link from "next/link";

const Footer: React.FC = () => (
  <div className="w-screen grey-bg text-white overflow-hidden">
    <ul className="flex flex-row flex-wrap justify-around items-center max-w-3xl m-auto px-4 min-h-fit">
      <li className="py-4 px-2">
        <Link href="/statute">Regulamin</Link>
      </li>
      <li className="py-4 px-2">
        <Link href="/contact">Kontakt</Link>
      </li>
      <li className="py-4 px-2">
        <Link href="/privacyPolicy">Polityka Prywatności</Link>
      </li>
      <li className="py-4 px-2">
        <Link href="/addPet">Dodaj ogłoszenie</Link>
      </li>
    </ul>
  </div>
);

export default Footer;
