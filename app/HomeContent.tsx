"use client";

import { Footer, Header } from "@/components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { PetCard } from "@/components/ui";

interface Pet {
  pet_id: string;
  name: string;
  directory_url: string;
  avatar_url: string;
  photos: { photo_id: string; photo_url: string }[];
}

export const HomeContent = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState<string>("");

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    axios
      .get("/api/getAllPets")
      .then((response) => {
        if (response.data.status === "success") {
          setPets(response.data.data);
          console.log(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania danych", error);
      });
  }, []);

  return (
    <main className="min-h-screen overflow-hidden flex items-center flex-col">
      <Header />
      <section className="flex flex-row flex-wrap justify-center gap-10 py-10 max-w-7xl">
        {filteredPets.map((pet) => {
          return (
            <PetCard
              key={pet.pet_id}
              apiEndpoint={`/api/image/${pet.directory_url}/${pet.avatar_url}`}
              label={pet.name}
              href={`/pet/${pet.pet_id}`}
            />
          );
        })}
      </section>
      <Footer />
    </main>
  );
};

export default HomeContent;
