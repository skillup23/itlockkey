"use client";

import { updateTodos } from "@/lib/actionTodo";
import { Save } from "lucide-react";
import { useState } from "react";

export default function ListTodo({ todo, keyObj, info, inputType }) {
  const [activeEdit, setActiveEdit] = useState(true);

  return (
    <>
      {/* {activeEdit ? (
        <div className="relative outset rounded-sm">
          <p className="w-full p-2 whitespace-pre-line">{info}</p>
          <FilePenLine
            size={24}
            onClick={() => setActiveEdit(!activeEdit)}
            className="absolute right-2 top-2 cursor-pointer text-blue"
          />
        </div>
      ) : ( */}
      <form
        action={async (FormData) => {
          await updateTodos(todo._id, FormData, keyObj);
          setActiveEdit(!activeEdit);
        }}
        className="relative w-full flex text-sm gap-2"
      >
        {inputType == "date" && (
          <input
            type="date"
            name={keyObj}
            className="mb-2 w-full py-2 px-3 inset"
            required
            defaultValue={info}
          />
        )}
        {inputType == "select" && (
          <select
            name={keyObj}
            defaultValue={info}
            className="w-full p-2 inset"
          >
            <option value="Открыта">Открыта</option>
            <option value="В работе">В работе</option>
            <option value="Ожидание">Ожидание</option>
            <option value="Закрыта">Закрыта</option>
          </select>
        )}
        {inputType == "textarea" && (
          <textarea
            type="text"
            name={keyObj}
            className="w-full p-2 inset"
            defaultValue={info}
            required
            rows="8"
            cols="20"
          />
        )}
        {!inputType && (
          <input
            type="text"
            name={keyObj}
            className="w-full p-2 inset"
            defaultValue={info}
            required
          />
        )}

        <button
          type="submit"
          // className="absolute w-6 right-2 top-2 p-0 text-orange"
          className="w-8 h-9 p-1 text-orange bg-white"
        >
          <Save size={24} />
        </button>
      </form>
      {/* )} */}
    </>
  );
}
