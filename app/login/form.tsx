import React, { useEffect, useState } from "react";
import { Input, Redirect, Submit } from "@/components";
import { signIn } from "next-auth/react";

const Form = () => {
  const [registerData, registerDataData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    registerDataData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await signIn("credentials", {
      email: registerData.email,
      password: registerData.password,
      redirect: true,
      callbackUrl: "/",
    });
    // try {
    //   const res = await fetch("/api/createUser", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       ...registerData,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   if (!res.ok) {
    //     setError((await res.json()).error);
    //     return;
    //   }

    //   signIn(undefined, { callbackUrl: "/" });
    // } catch (error: any) {
    //   setError(error?.message);
    // }
  };

  return (
    <form
      className="md:flex-1 flex flex-col justify-center items-center gap-4"
      onSubmit={handleSubmit}
    >
      {error && <div className="text-red-600 text-xl">{error}</div>}

      <Input
        type="email"
        name="email"
        placeholder="Podaj swój email"
        value={registerData.email}
        onChange={handleInputChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="Podaj swoje hasło"
        value={registerData.password}
        onChange={handleInputChange}
      />
      <Submit text="ZALOGUJ" />
      <Redirect href="/register" text="ZAREJESTRUJ" />
    </form>
  );
};

export default Form;
