import { deleteTodo } from "@/lib/actionTodo";
import Todo from "@/model/todoModel";
import Link from "next/link";
import React from "react";

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

        // Extracting day, month, and year components from the Date object
        const day = deadlineDate.getDate();
        const month = deadlineDate.getMonth() + 1; // Months are zero-based, so add 1
        const year = deadlineDate.getFullYear();

        // Formatting the date as MM/DD/YYYY
        return `${month}/${day}/${year}`;
      };

      // Creating a new Date object from the given string
      return (
        <div className="w-full">
          <h2 className="text-center text-green-400 font-bold mb-4">
            Текущие задачи
          </h2>
          {todos.reverse().map((todo) => (
            <div
              key={todo._id}
              className="w-full p-4 flex gap-2 my-4 outset rounded-xl"
            >
              <div className="w-full flex gap-4 items-center ">
                <h3>{todo.title}</h3>
                {/* <h3 className="text-balance">{todo.description}</h3> */}
                <div className="ml-auto mr-6 flex flex-col justify-between">
                  <h3>{todo.company}</h3>
                  <p>{deadLineToDate(todo.todoDeadline)}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Link href={`/todos/${todo._id}`}>
                  <button className="border rounded px-2 bg-red-400">
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
                  <button className="border rounded px-2 bg-red-400">
                    Удалить
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }
}
