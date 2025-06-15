"use client";

import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";

export default function AllTodos({ todos, dataCompany, userName }) {
  const [tasks, setTasks] = useState([]);

  // Загрузка задач
  useEffect(() => {
    const fetchTasks = async () => {
      const data = await todos;
      setTasks(data);
    };
    fetchTasks();
  }, [todos]);

  // Фильтрация задач по статусу
  const openTasks = tasks.filter((task) => task.status === "Открыта");
  const completedTasks = tasks.filter((task) => task.status === "В работе");
  const timestopTasks = tasks.filter((task) => task.status === "Ожидание");
  const closedTasks = tasks.filter((task) => task.status === "Закрыта");

  return (
    <div className="mt-12">
      <div className="absolute top-0 left-[332px]">
        <button className="w-80 mb-1 text-center text-base font-bold">
          Фильтры задач
        </button>
      </div>

      <div className="pb-10 pr-12 flex gap-5 overflow-x-auto">
        <div className="w-[320px] flex flex-col gap-5">
          <h6 className="px-4 bg-green-200 rounded-md">Открыта</h6>
          {openTasks.reverse().map((todo) => (
            <TodoCard
              key={todo._id}
              {...todo}
              userName={userName}
              dataCompany={dataCompany}
            />
          ))}
        </div>

        <div className="w-[320px] flex flex-col gap-5">
          <h6 className="px-4 bg-purple-200 rounded-md">В работе</h6>
          {completedTasks.reverse().map((todo) => (
            <TodoCard
              key={todo._id}
              {...todo}
              userName={userName}
              dataCompany={dataCompany}
            />
          ))}
        </div>

        <div className="w-[320px] flex flex-col gap-5">
          <h6 className="px-4 bg-yellow-200 rounded-md">Ожидание</h6>
          {timestopTasks.reverse().map((todo) => (
            <TodoCard
              key={todo._id}
              {...todo}
              userName={userName}
              dataCompany={dataCompany}
            />
          ))}
        </div>

        <div className="w-[320px] flex flex-col gap-5">
          <h6 className="px-4 bg-blue-200 rounded-md">Закрыта</h6>
          {closedTasks.reverse().map((todo) => (
            <TodoCard
              key={todo._id}
              {...todo}
              userName={userName}
              dataCompany={dataCompany}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
