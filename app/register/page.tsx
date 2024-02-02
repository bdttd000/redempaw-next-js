"use client";
import logo from "@/public/assets/logo.svg";
import Image from "next/image";
import Form from "./form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-5 gap-8">
      <div className="md:flex-1 flex flex-col justify-center items-center">
        <Image
          priority
          src={logo}
          className="w-full md:w-4/5 h-auto"
          alt="Logo"
        />
        <div className="text-5xl lg:text-7xl xl:text-6xl 2xl:text-8xl">
          REDEM<span className="brown-color">PAW</span>
        </div>
      </div>
      <Form />
    </div>
  );
};

export default page;
