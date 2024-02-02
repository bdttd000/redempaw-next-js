"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Input, Submit, InputFile, InputFiles, Textarea } from "@/components";
import { city } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const Form = () => {
  const [cities, setCities] = useState<city[]>();
  const [city, setCity] = useState<string | null>(null);
  const [avatar, setMainImage] = useState<File>();
  const [imageId, setImageId] = useState<string>("");
  const [additional_images, setAdditionalImages] = useState<File[]>([]);
  const [additionalName, setAdditionalName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  const [addPetData, setAddPetData] = useState({
    name: "",
    description: "",
    city: "",
    pet_info_id: "",
    directoryUrl: "",
    avatarUrl: "",
    user_id: "",
  });

  const AddPet = async () => {
    const mainImageInputRef = useRef<HTMLInputElement>(null);
    const additionalImagesInputRef = useRef<HTMLInputElement>(null);
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleAdditionalImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.length) {
      setAdditionalImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const directory = uuidv4();
    addPetData.directoryUrl = directory;

    const petInfoId = uuidv4();
    addPetData.pet_info_id = petInfoId;

    const avatarUrl = uuidv4();
    addPetData.avatarUrl = avatarUrl;

    console.log(addPetData);
    console.log(user);

    const response = await fetch("/api/addPet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...addPetData,
      }),
    });

    if (avatar) {
      await uploadImage(avatar, directory);
    }

    for (const image of additional_images) {
      await uploadImage(image, directory);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAddPetData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const uploadImage = async (image: File, directory: string) => {
    const data = new FormData();
    const imageId = uuidv4();

    data.append("file", image);
    data.append("imageId", imageId);
    data.append("directory", directory);

    const res2 = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    console.log(addPetData.pet_info_id, imageId);

    const response = await fetch("/api/uploadPhoto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pet_info_id: addPetData.pet_info_id,
        photo_url: imageId,
      }),
    });
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/getCities")
      .then((response) => response.json())
      .then((res) => setCities(res.data))
      .catch((error) => console.error("Błąd podczas pobierania miast:", error));

    fetch("http://localhost:3000/api/session")
      .then((response) => response.json())
      .then((res) => setUser(res.data))
      .catch((error) => console.error("Błąd podczas pobierania miast:", error));
  }, []);

  return (
    <form
      className="md:flex-1 flex flex-col justify-center items-center gap-4"
      onSubmit={handleSubmit}
    >
      <InputFile
        text="Wybierz zdjęcie główne"
        name="avatar"
        onChange={handleMainImageChange}
      />

      {avatar && (
        <Image
          src={URL.createObjectURL(avatar)}
          alt="Podgląd głównego zdjęcia"
          width={500}
          height={300}
        />
      )}

      <InputFiles
        text="Wybierz dodatkowe zdjęcia"
        name="photos"
        onChange={handleAdditionalImagesChange}
      />

      {additional_images.map((image, index) => (
        <Image
          key={index}
          src={URL.createObjectURL(image)}
          alt={`Podgląd zdjęcia ${index + 1}`}
          width={500}
          height={300}
        />
      ))}

      <select
        name="city"
        className="border-2 outline-none p-2 rounded-lg light-bg input-font w-4/5 lg:w-1/2"
        onChange={handleInputChange}
        required
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
        value={addPetData.name}
        onChange={handleInputChange}
      />

      <Textarea
        name="description"
        onChange={handleInputChange}
        placeholder="Wprowadź opis"
      />

      <Submit text="DODAJ ZWIERZAKA" />
      {error && <>{error}</>}
    </form>
  );
};

export default Form;
