"use client";

import React from "react";
import ButtomDeleteTodo from "./ButtomDeleteTodo";
import ListTodo from "./ListTodo";

function TodoCard(todo) {
  //изменение формата даты дд.мм.гггг
  const deadLineToDate = (todoDeadline) => {
    // const currentDateCrt = new Date(data.createdAt);
    // const currentDateUpd = new Date(data.updatedAt);
    const currentDeadline = new Date(todoDeadline);
    // const options = {
    //   hour: "numeric",
    //   minute: "numeric",
    //   second: "numeric",
    // };
    // const dateCreate = currentDateCrt.toLocaleDateString("ru-RU", options);
    // const dateUpdate = currentDateUpd.toLocaleDateString("ru-RU", options);
    const deadline = currentDeadline.toISOString().substring(0, 10);
    return deadline;
  };

  return (
    <div className="relative w-65 p-4 bg-white border rounded-[10px]">
      <div className="flex flex-col gap-3">
        <ListTodo
          id={todo._id.toString()}
          keyObj="title"
          info={todo.title}
          cssClass="text-base leading-5 font-semibold"
        />
        <ListTodo
          id={todo._id.toString()}
          keyObj="status"
          info={todo.status}
          inputType="selectStatus"
        />
        <ListTodo
          id={todo._id.toString()}
          keyObj="todoDeadline"
          info={deadLineToDate(todo.todoDeadline)}
          inputType="date"
        />
        <ListTodo
          id={todo._id.toString()}
          keyObj="description"
          info={todo.description}
        />
        <ListTodo
          id={todo._id.toString()}
          keyObj="company"
          info={todo.company}
          inputType="selectCompany"
        />
      </div>
      <ButtomDeleteTodo idTodo={todo._id.toString()} />
    </div>
  );
}

export default TodoCard;
