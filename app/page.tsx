import { randomUUID } from "crypto";
import React from "react";
import prisma from "@/prisma/db";

const users = await prisma.users.findMany();

const page = () => {
  const uuid = randomUUID();

  return <div>{uuid}</div>;
};

export default page;
