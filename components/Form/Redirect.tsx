import Link from "next/link";
import React from "react";

const Redirect: React.FC<{ href: string; text: string }> = ({ href, text }) => {
  return (
    <Link
      href={href}
      className="outline-none light-bg p-2 rounded-lg text-white input-font w-4/5 lg:w-1/2"
    >
      {text}
    </Link>
  );
};

export default Redirect;
