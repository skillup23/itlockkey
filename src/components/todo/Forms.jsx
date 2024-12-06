'use client';

import { createTodos } from '@/lib/actionTodo';
import { useRef } from 'react';
import SubmitButton from './SubmitButton';

export default function Forms() {
  const ref = useRef(null);

  return (
    <form
      ref={ref}
      action={async (FormData) => {
        ref.current?.reset();
        await createTodos(FormData);
      }}
      className="p-5 flex flex-col outset rounded-2xl"
    >
      <h2 className="mb-4 text-center text-xl font-bold">
        Добавить новую задачу
      </h2>

      <label htmlFor="title" className="py-2">
        Название
      </label>
      <input
        type="text"
        name="title"
        className="mb-2 w-96 py-2 px-3 inset"
        required
      />

      <label htmlFor="description" className="py-2">
        Описание
      </label>
      <textarea
        type="text"
        name="description"
        className="mb-2 w-96 py-2 px-3 inset"
        required
        rows="5"
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
        className="mb-2 w-96 py-2 px-3 inset"
        required
      />

      <label htmlFor="todoDeadline" className="py-2">
        Дедлайн
      </label>
      <input
        type="date"
        name="todoDeadline"
        className="w-96 py-2 px-3 inset"
        required
      />

      <SubmitButton
        cssStyle="hover:text-green-500"
        text="Добавить задачу"
        textLoad="Добавление..."
      />
    </form>
  );
}
