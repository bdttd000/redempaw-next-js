"use client";
import React, { useState } from "react";
import logo from "@/public/assets/logo.svg";
import Image from "next/image";
import { Input } from "@/components";

const page = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-5 gap-8">
      <div className="md:flex-1 flex flex-col justify-center items-center">
        <Image
          priority
          src={logo}
          className="w-full md:w-4/5 h-auto"
          alt="Logo"
        />
        <div className="text-5xl xl:text-6xl lg:text-8xl">
          REDEM<span className="brown-color">PAW</span>
        </div>
      </div>
      <div className="md:flex-1 flex flex-col justify-center items-center gap-4">
        <Input
          type="email"
          name="email"
          placeholder="Podaj swój email"
          value={loginData.email}
          onChange={handleInputChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Podaj swój email"
          value={loginData.email}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default page;
