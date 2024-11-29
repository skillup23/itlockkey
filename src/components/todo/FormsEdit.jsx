'use client';
import { updateTodos } from '@/lib/actionTodo';

// import { useRef } from "react";
// import SubmitButton from "./SubmitButton";
// import Todo from '@/model/todoModel';

export default function FormsEdit({ todo }) {
  //   const ref = useRef(null);

  return (
    <form
      action={async (FormData) => {
        await updateTodos(todo._id, FormData);
      }}
      className="flex flex-col"
    >
      <label htmlFor="title" className="py-2">
        Название
      </label>
      <input
        type="text"
        name="title"
        className="mb-2 w-62 h-10 p-2"
        required
        defaultValue={todo.title}
      />

      <button type="submit">Изменить</button>
    </form>
  );
}
