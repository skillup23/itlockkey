'use client';

import { createTodos } from '@/lib/actionTodo';
import { useRef, useState } from 'react';
import SubmitButton from '../SubmitButton';

export default function AddNewTask() {
  // const [show, setShow] = useState(true);
  const ref = useRef(null);

  return (
    <div className="fixed right-0 top-0 w-1/2 h-screen p-2 bg-white border shadow-xl z-30">
      <h2>Функциональные кнопки</h2>
      <form
        ref={ref}
        action={async (FormData) => {
          ref.current?.reset();
          await createTodos(FormData);
          //   setShow(!show);
        }}
        className="w-full my-4 p-6 flex flex-col rounded-xl text-sm"
      >
        {/* <label htmlFor="title" className="py-2">
          Название
        </label> */}
        <input
          type="text"
          name="title"
          className="mb-2 w-full py-2 px-3"
          placeholder="НОВАЯ ЗАДАЧА"
          required
        />
        <div className="px-3 flex">
          <label htmlFor="description" className="py-2 w-[150px]">
            Описание
          </label>
          <textarea
            type="text"
            name="description"
            className="mb-2 w-full py-2 px-3"
            placeholder="Пусто"
            required
            rows="2"
            cols="20"
          />
        </div>

        <div className="px-3 flex">
          <label htmlFor="company" className="py-2 w-[150px]">
            Организация
          </label>
          <input
            type="text"
            name="company"
            placeholder="Пусто"
            className="mb-2 w-full py-2 px-3"
            required
          />
        </div>

        <div className="px-3 flex">
          <label htmlFor="todoDeadline" className="py-2 w-[150px]">
            Дедлайн
          </label>
          <input
            type="date"
            name="todoDeadline"
            className="w-full py-2 px-3"
            required
          />
        </div>

        {/* <input
                type="text"
                name="description"
                className="mb-2 w-62 h-10 p-2"
                required
              /> */}

        <SubmitButton
          cssStyle="bg-blue text-black w-1/3 flex justify-center hover:bg-gray"
          text="Добавить задачу"
          textLoad="Добавление..."
        />
      </form>
    </div>
  );
}
