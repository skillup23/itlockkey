"use client";

import { createCompany } from "@/lib/actionCompany";
import { useRef } from "react";
import SubmitButton from "../SubmitButton";

export default function FormNewCompany() {
  const ref = useRef(null);

  return (
    <form
      ref={ref}
      action={async (FormData) => {
        ref.current?.reset();
        await createCompany(FormData);
      }}
      className="mt-4 w-80 flex flex-col text-sm gap-2"
    >
      <input
        type="text"
        name="title"
        className="w-full py-1 px-2 border bg-white rounded"
        required
      />

      <SubmitButton
        cssStyle="bg-green-200 text-black justify-center items-center hover:bg-green-400"
        text="Добавить"
        textLoad="Добавление..."
      />
    </form>
  );
}
