import React from "react";

const getUsers = async () => {
  const res = await fetch("/api/getUsers");
  if (!res.ok) {
    console.log(res);
  }
  return res.json();
};

const page = async () => {
  const data = await getUsers();
  console.log(data);
};

export default page;
