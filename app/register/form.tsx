import React, { useEffect, useState } from "react";
import { city } from "@prisma/client";
import { Input, Redirect, Submit } from "@/components";
import { redirect } from "next/navigation";

const Form = () => {
  const [cities, setCities] = useState<city[]>();
  const [citiesFetched, setCititesFetched] = useState(false);
  const [registerData, registerDataData] = useState({
    name: "",
    surname: "",
    email: "",
    password1: "",
    password2: "",
    phone: "",
    city: "",
    address: "",
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
    setError(null);
    console.log(registerData);

    if (registerData.city === "") {
      setError("Proszę wybrać miasto!");
      return;
    }

    if (registerData.password1 !== registerData.password2) {
      setError("Podane hasła nie są takie same!");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          ...registerData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        redirect("/login");
      } else {
        setError((await res.json()).error);
      }
    } catch (error: any) {
      setError(error?.message);
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/getCities")
      .then((response) => response.json())
      .then((res) => setCities(res.data))
      .then(() => setCititesFetched(true))
      .catch((error) => console.error("Błąd podczas pobierania miast:", error));
  }, []);

  return (
    <form
      className="md:flex-1 flex flex-col justify-center items-center gap-4"
      onSubmit={handleSubmit}
    >
      {error && <div className="text-red-600 text-xl">{error}</div>}

      <select
        name="city"
        className="border-2 outline-none p-2 rounded-lg light-bg input-font w-4/5 lg:w-1/2"
        onChange={handleInputChange}
        required
        disabled={!citiesFetched}
      >
        {cities ? (
          cities.map((city, index) => {
            const information = (
              <option selected value="">
                Wybierz miasto
              </option>
            );
            return (
              <>
                {!index ? information : ""}
                <option key={index} value={city.city_id}>
                  {city.name}
                </option>
              </>
            );
          })
        ) : (
          <option selected>Zaczytywanie miast...</option>
        )}
      </select>

      <Input
        type="text"
        name="name"
        placeholder="Podaj swoje imię"
        value={registerData.name}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="surname"
        placeholder="Podaj swoje nazwisko"
        value={registerData.surname}
        onChange={handleInputChange}
      />
      <Input
        type="email"
        name="email"
        placeholder="Podaj swój email"
        value={registerData.email}
        onChange={handleInputChange}
      />
      <Input
        type="password"
        name="password1"
        placeholder="Podaj swoje hasło"
        value={registerData.password1}
        onChange={handleInputChange}
      />
      <Input
        type="password"
        name="password2"
        placeholder="Powtórz hasło"
        value={registerData.password2}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="phone"
        placeholder="Podaj numer telefonu"
        value={registerData.phone}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="address"
        placeholder="Podaj swój adres"
        value={registerData.address}
        onChange={handleInputChange}
      />
      <Submit text="ZAREJESTRUJ" />
      <Redirect href="/login" text="ZALOGUJ" />
    </form>
  );
};

export default Form;
