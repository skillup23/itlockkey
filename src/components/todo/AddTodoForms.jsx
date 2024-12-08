"use client";

import { createTodos } from "@/lib/actionTodo";
import { useRef } from "react";
import SubmitButton from "../SubmitButton";

export default function AddTodoForm() {
  const ref = useRef(null);

  return (
    <form
      ref={ref}
      action={async (FormData) => {
        ref.current?.reset();
        await createTodos(FormData);
      }}
      className="w-96 ml-4 p-4 flex flex-col outset rounded-xl text-sm"
    >
      <h2 className="mb-1 text-center text-base font-bold">
        Добавить новую задачу
      </h2>

      <label htmlFor="title" className="py-2">
        Название
      </label>
      <input
        type="text"
        name="title"
        className="mb-2 w-full py-2 px-3 inset"
        required
      />

      <label htmlFor="description" className="py-2">
        Описание
      </label>
      <textarea
        type="text"
        name="description"
        className="mb-2 w-full py-2 px-3 inset"
        required
        rows="3"
        cols="20"
      />
      {/* <input
        type="text"
        name="description"
        className="mb-2 w-62 h-10 p-2"
        required
      /> */}

      <label htmlFor="company" className="py-2">
        Организация
      </label>
      <input
        type="text"
        name="company"
        className="mb-2 w-full py-2 px-3 inset"
        required
      />

      <label htmlFor="todoDeadline" className="py-2">
        Дедлайн
      </label>
      <input
        type="date"
        name="todoDeadline"
        className="w-full py-2 px-3 inset"
        required
      />

      <SubmitButton
        cssStyle="bg-blue text-white"
        text="Добавить задачу"
        textLoad="Добавление..."
      />
    </form>
  );
}
