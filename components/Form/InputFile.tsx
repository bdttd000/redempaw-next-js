import React from "react";

const InputFile: React.FC<{ text: string; name: string; onChange: any }> = ({
  text,
  name,
  onChange,
}) => {
  return (
    <div className="mb-3 w-96">
      <label
        htmlFor="formFile"
        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
      >
        {text}
      </label>
      <input
        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal
         text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 
         file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 
         file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] cursor-pointer"
        type="file"
        id="formFile"
        name={name}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputFile;
