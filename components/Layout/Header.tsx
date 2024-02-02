"use client";

import React from "react";
import logo from "@/public/assets/logo.svg";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Header = () => (
  <div className="w-screen grey-bg text-white">
    <div className="flex flex-row justify-between items-center max-w-5xl m-auto px-4 h-16 ">
      <Link className="flex items-center h-full sm:text-2xl" href="/">
        <Image priority src={logo} className="h-4/5 w-auto" alt="Logo" />
        <span className="hidden sm:block">REDEM</span>
        <span className="brown-color hidden sm:block">PAW</span>
      </Link>
      <span
        className="flex items-center h-full sm:text-xl cursor-pointer"
        onClick={() => signOut()}
      >
        WYLOGUJ
      </span>
    </div>
  </div>
);

export default Header;
