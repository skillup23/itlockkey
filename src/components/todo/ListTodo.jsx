'use client';

import { useState } from 'react';
import { updateTodos } from '@/lib/actionTodo';

// import { useRef } from "react";
// import SubmitButton from "./SubmitButton";
// import Todo from '@/model/todoModel';

export default function ListTodo({ todo, keyObj, info }) {
  //   const ref = useRef(null);
  const [activeEdit, setActiveEdit] = useState(true);
  //   const [titleSave, setTitleSave] = useState(todo.title);
  //   const [descriptionSave, setDescriptionSave] = useState(todo.description);

  //   const data = JSON.parse(JSON.stringify(todo));

  //   const id = data._id;

  return (
    <>
      {activeEdit ? (
        <div className="flex gap-8 border-2">
          <h2 className="p-2 w-72">{info}</h2>
          <button
            onClick={() => setActiveEdit(!activeEdit)}
            className="p-2 bg-slate-300"
          >
            Изменить
          </button>
        </div>
      ) : (
        <form
          action={async (FormData) => {
            await updateTodos(todo._id, FormData, keyObj);
            setActiveEdit(!activeEdit);
          }}
          className="flex gap-8 border-2"
        >
          <input
            type="text"
            name={keyObj}
            className="w-72 p-2"
            required
            defaultValue={info}
          />

          <button type="submit" className="p-2 bg-slate-600">
            Сохранить
          </button>
        </form>
      )}
    </>
  );
}
