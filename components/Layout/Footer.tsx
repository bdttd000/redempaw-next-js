"use client";

import React from "react";
import Link from "next/link";

const Footer: React.FC = () => (
  <div className="w-screen grey-bg text-white absolute bottom-0 left-0 overflow-hidden">
    <ul className="flex flex-row justify-around items-center max-w-3xl m-auto px-4 h-14">
      <li>
        <Link href="/statute">Regulamin</Link>
      </li>
      <li>
        <Link href="/contact">Kontakt</Link>
      </li>
      <li>
        <Link href="/privacyPolicy">Polityka Prywatności</Link>
      </li>
    </ul>
  </div>
);

export default Footer;
