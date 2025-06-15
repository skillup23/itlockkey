"use client";

import { status, usersList } from "@/data/arch";
import { createTodos } from "@/lib/actionTodo";
import { useRef } from "react";
import SubmitButton from "../SubmitButton";

export default function FormNewTask({ dataCompany, children }) {
  const ref = useRef(null);

  const company = dataCompany;

  return (
    <div className="fixed right-0 top-0 w-1/2 h-screen p-2 bg-white border shadow-xl z-30">
      <div>{children}</div>
      <form
        ref={ref}
        action={async (FormData) => {
          ref.current?.reset();
          await createTodos(FormData);
          //   setShow(!show);
        }}
        className="w-full my-4 p-6 flex flex-col rounded-xl text-sm gap-2"
        autoComplete="off"
      >
        {/* <label htmlFor="title" className="py-2">
          Название
        </label> */}
        <input
          type="text"
          name="title"
          className="w-full py-2 px-3 text-lg"
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
            className="w-2/3 py-2 px-3"
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
          <select
            type="text"
            name="company"
            placeholder="Пусто"
            className="py-2 px-3 appearance-none"
            required
          >
            <option value="Пусто" className="text-gray">
              Пусто
            </option>
            {company.map((item) => (
              <option value={item.title} key={item._id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <div className="px-3 flex">
          <label htmlFor="status" className="py-2 w-[150px]">
            Статус
          </label>
          <select
            type="text"
            name="status"
            placeholder="Открыта"
            className="py-2 px-3 appearance-none"
            required
          >
            {status.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="px-3 flex">
          <label htmlFor="todoDeadline" className="py-2 w-[150px]">
            Дедлайн
          </label>
          <input
            type="date"
            name="todoDeadline"
            className="py-2 px-3"
            required
          />
        </div>

        <div className="px-3 flex">
          <label htmlFor="executor" className="py-2 w-[150px]">
            Исполнитель
          </label>
          <select
            type="text"
            name="executor"
            className="py-2 px-3 appearance-none"
            required
          >
            {usersList.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="px-3 flex">
          <label htmlFor="manager" className="py-2 w-[150px]">
            Постановщик
          </label>
          <select
            type="text"
            name="manager"
            className="py-2 px-3 appearance-none"
            required
          >
            {usersList.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* <input
                type="text"
                name="description"
                className="mb-2 w-62 h-10 p-2"
                required
              /> */}

        <SubmitButton
          cssStyle="mt-4 mx-auto bg-blue text-black w-1/3 flex justify-center hover:bg-gray"
          text="Добавить задачу"
          textLoad="Добавление..."
        />
      </form>
    </div>
  );
}
