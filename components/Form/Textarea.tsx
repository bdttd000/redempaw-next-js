import React, { ChangeEventHandler } from "react";

type InputTypes = "text" | "password" | "email";

const Textarea: React.FC<{
  name: string;
  onChange: ChangeEventHandler;
  placeholder: string;
}> = ({ name, onChange, placeholder }) => {
  return (
    <textarea
      className="border-2 outline-none p-2 rounded-lg bg-transparent text-white input-font w-4/5 lg:w-1/2"
      name={name}
      onChange={onChange}
      required
      rows={10}
      placeholder={placeholder}
    ></textarea>
  );
};

export default Textarea;
