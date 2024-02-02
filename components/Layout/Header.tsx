import React from "react";
import Link from "next/link";
import logo from "@/public/assets/logo.svg";
import Image from "next/image";

const Header = () => (
  <div className="w-screen bg-blue-500 text-white">
    <div className="flex flex-row justify-between items-center max-w-5xl m-auto px-4 h-16 ">
      <Image
        priority
        src={logo}
        className="w-full md:w-4/5 h-auto"
        alt="Logo"
      />
      <Link href="/" className="text-4xl"></Link>
      <Link href="/" className="text-4xl"></Link>
      XDDDDDDDDDDDDDDD
    </div>
  </div>
);

export default Header;
