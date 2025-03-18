import { deleteTodo } from "@/lib/actionTodo";
import Todo from "@/model/todoModel";
import Link from "next/link";
import React from "react";
import ListTodo from "./ListTodo";

export default async function AllTodos() {
  try {
    const todos = await Todo.find();
    if (todos.length === 0) {
      return (
        <h1 className="mt-6 text-red-400 font-bold text-xl">
          У вас нет текущих задач
        </h1>
      );
    } else {
      const deadLineToDate = (todoDeadline) => {
        const deadlineDate = new Date(todoDeadline);

        return deadlineDate.toLocaleDateString("ru-RU");
        // const day = deadlineDate.getDate();
        // const month = deadlineDate.getMonth() + 1; // Months are zero-based, so add 1
        // const year = deadlineDate.getFullYear();

        // return `${day}/${month}/${year}`;
      };

      return (
        <div className="mt-12">
          <div className="absolute top-0 left-[332px]">
            <button className="w-80 mb-1 text-center text-base font-bold">
              Фильтры задач
            </button>
          </div>

          <div className="flex gap-4 flex-wrap">
            {todos.reverse().map((todo) => (
              <div
                key={todo._id}
                className="w-80 p-4 flex flex-col gap-2 my-4 outset rounded-xl"
              >
                <h6 className="font-bold text-center">{todo.title}</h6>
                <h6 className="text-balance whitespace-pre-line">
                  {todo.description}
                </h6>
                <div className="w-full mt-auto">
                  <ListTodo
                    todo={JSON.parse(JSON.stringify(todo))}
                    keyObj="status"
                    info={JSON.parse(JSON.stringify(todo.status))}
                    inputType="select"
                  />
                </div>
                <div className="w-full flex justify-between">
                  <h6>{todo.company}</h6>
                  <p>{deadLineToDate(todo.todoDeadline)}</p>
                </div>
                <div className="flex justify-between gap-4">
                  <Link href={`/todos/${todo._id}`}>
                    <button className="border rounded-sm px-2 bg-red-400">
                      Подробнее
                    </button>
                  </Link>
                  <form action={deleteTodo}>
                    <input
                      hidden
                      type="text"
                      name="id"
                      defaultValue={todo._id.toString()}
                    />
                    <button className="border rounded-sm px-2 bg-red-400">
                      Удалить
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }
}
