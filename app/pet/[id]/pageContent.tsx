"use client";

import { Header, Footer } from "@/components/Layout";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

interface PetData {
  photos: { photo_url: string; photo_id: string }[];
  user_info: { name: string; address: string; phone: string };
  name: string;
  description: string;
}

const PageContent = () => {
  const [petData, setPetData] = useState<PetData | null>(null);
  const [petId, setPetId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const pathname = usePathname();
  const searchParameters = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const pathParts = pathname.split("/");
      const id = pathParts[pathParts.length - 1];
      setPetId(id);
    }
  }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (petId) {
          const response = await fetch(`/api/getPet/${petId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch pet data");
          }
          const data = await response.json();
          setPetData(data);
          console.log(`/api/image/${data.directory_url}/${data.avatar_url}`);
          const imageUrlResponse = await fetch(
            `/api/image/${data.directory_url}/${data.avatar_url}`
          );
          if (!imageUrlResponse.ok) {
            throw new Error("Failed to fetch image");
          }
          const blob = await imageUrlResponse.blob();
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [petId]);

  return (
    <main className="min-h-screen overflow-hidden flex items-center flex-col">
      <Header />
      {petData ? (
        <section className="flex flex-row flex-wrap justify-center gap-10 py-10 max-w-7xl">
          <div className="light-bg rounded-2xl p-10 flex flex-col gap-6">
            <h2>{petData.name}</h2>
            <p>{petData.description}</p>
            <p>Właściciel: {petData.user_info.name}</p>
            <p>Kontakt: {petData.user_info.phone}</p>
            <p>Adres: {petData.user_info.address}</p>
            {imageUrl ? (
              <Image width={100} height={100} src={imageUrl} alt="Pet" />
            ) : (
              ""
            )}
          </div>
        </section>
      ) : (
        <div>Loading...</div>
      )}

      <Footer />
    </main>
  );
};

export default PageContent;
