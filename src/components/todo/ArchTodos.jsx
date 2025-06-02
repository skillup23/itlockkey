'use client';

import React, { useEffect, useState } from 'react';
import TodoCard from './TodoCard';

export default function ArchTodos({ todos, userName }) {
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
  const archTasks = tasks.filter((task) => task.status === 'Архив');

  return (
    <div className="mt-12">
      <div className="absolute top-0 left-[332px]">
        <button className="w-80 mb-1 text-center text-base font-bold">
          Фильтры задач
        </button>
      </div>

      <div className="pb-10 flex gap-5 overflow-x-auto">
        <div className="flex flex-col gap-5">
          <h6 className="w-[320px] px-4 bg-red-200 rounded-md">Архив задач</h6>
          <div className="flex flex-wrap gap-5">
            {archTasks.reverse().map((todo) => (
              <TodoCard key={todo._id} {...todo} userName={userName} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
