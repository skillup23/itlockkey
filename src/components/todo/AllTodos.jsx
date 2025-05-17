"use client";

import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";

export default function AllTodos({ todos }) {
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
  const archTasks = tasks.filter((task) => task.status === "Архив");

  return (
    <div className="mt-12">
      <div className="absolute top-0 left-[332px]">
        <button className="w-80 mb-1 text-center text-base font-bold">
          Фильтры задач
        </button>
      </div>

      <div className="pb-10 flex gap-5 overflow-x-auto">
        <div className="w-[260px] flex flex-col gap-5">
          <h6 className="px-4 bg-green-200 rounded-md">Открыта</h6>
          {openTasks.reverse().map((todo) => (
            <TodoCard key={todo._id} {...todo} />
          ))}
        </div>

        <div className="w-[260px] flex flex-col gap-5">
          <h6 className="px-4 bg-purple-200 rounded-md">В работе</h6>
          {completedTasks.reverse().map((todo) => (
            <TodoCard key={todo._id} {...todo} />
          ))}
        </div>

        <div className="w-[260px] flex flex-col gap-5">
          <h6 className="px-4 bg-yellow-200 rounded-md">Ожидание</h6>
          {timestopTasks.reverse().map((todo) => (
            <TodoCard key={todo._id} {...todo} />
          ))}
        </div>

        <div className="w-[260px] flex flex-col gap-5">
          <h6 className="px-4 bg-blue-200 rounded-md">Закрыта</h6>
          {closedTasks.reverse().map((todo) => (
            <TodoCard key={todo._id} {...todo} />
          ))}
        </div>

        <div className="w-[260px] flex flex-col gap-5">
          <h6 className="px-4 bg-red-200 rounded-md">Архив</h6>
          {archTasks.reverse().map((todo) => (
            <TodoCard key={todo._id} {...todo} />
          ))}
        </div>
      </div>
    </div>
  );
}

// <div
//   key={todo._id}
//   className="relative w-65 p-4 bg-white border rounded-[10px]"
// >
//   <div className="flex flex-col gap-3">
//     <ListTodo
//       todo={JSON.parse(JSON.stringify(todo))}
//       keyObj="title"
//       info={todo.title}
//       cssClass="text-base leading-5 font-semibold"
//     />
//     <ListTodo
//       todo={JSON.parse(JSON.stringify(todo))}
//       keyObj="status"
//       info={todo.status}
//       inputType="selectStatus"
//     />
//     <ListTodo
//       todo={JSON.parse(JSON.stringify(todo))}
//       keyObj="todoDeadline"
//       info={deadLineToDate(todo.todoDeadline)}
//       inputType="date"
//     />
//     <ListTodo
//       todo={JSON.parse(JSON.stringify(todo))}
//       keyObj="description"
//       info={todo.description}
//     />
//     <ListTodo
//       todo={JSON.parse(JSON.stringify(todo))}
//       keyObj="company"
//       info={todo.company}
//       inputType="selectCompany"
//     />
//   </div>
//   <ButtomDeleteTodo idTodo={todo._id.toString()} />

//   {/* <h6 className="text-balance whitespace-pre-line">
//   {todo.description}
// </h6> */}
//   {/* <div className="w-full flex justify-between">
//   <h6>{todo.company}</h6>
//   <p>{deadLineToDate(todo.todoDeadline)}</p>
// </div> */}
//   {/* <div className="flex justify-between gap-4">
//   <Link href={`/todos/${todo._id}`}>
//     <button className="border rounded-sm px-2 bg-red-400">
//       Подробнее
//     </button>
//   </Link>
//   <form action={deleteTodo}>
//     <input
//       hidden
//       type="text"
//       name="id"
//       defaultValue={todo._id.toString()}
//     />
//     <button className="border rounded-sm px-2 bg-red-400">
//       Удалить
//     </button>
//   </form>
// </div> */}
// </div>
