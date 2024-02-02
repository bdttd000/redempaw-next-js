import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface PetComponentProps {
  apiEndpoint: string;
  label: string;
  href: string;
}

interface PetData {
  imageUrl: string;
  label: string;
}

const PetComponent: React.FC<PetComponentProps> = ({
  apiEndpoint,
  label,
  href,
}) => {
  const [petData, setPetData] = useState<PetData | null>(null);

  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => response.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setPetData({ imageUrl, label: label });
      })
      .catch((error) => console.error("Error:", error));
  }, [apiEndpoint, label]);

  if (!petData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center w-52 sm:w-96 justify-center py-2 transition-all  hover:brightness-90 hover:scale-105">
      <div className=" rounded-3xl p-5 w-full h-72 flex flex-col items-center justify-center relative ">
        <Link href={href} className="contents">
          <Image
            className="relative rounded-3xl"
            src={petData.imageUrl}
            fill={true}
            objectFit="cover"
            alt={"Background Image"}
          />
        </Link>
        <p className="mt-2 text-center">{label}</p>
      </div>
    </div>
  );
};

export default PetComponent;
