"use client";

import { ChevronsDown } from "lucide-react";
import React, { useState } from "react";
import ButtomDeleteTodo from "./ButtomDeleteTodo";
import ListTodo from "./ListTodo";

function TodoCard(todo, userName) {
  const [isOpenComments, setIsOpenComments] = useState(false);
  const [isComments, setIsComments] = useState(JSON.parse(todo.comments));

  // // Загрузка комментариев
  // useEffect(() => {
  //   const fetchComments = async () => {
  //     const data = await todo;
  //     setIsComments(JSON.parse(data.comments));
  //   };
  //   fetchComments();
  // }, [todo]);

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
    <div className="h-fit relative w-65 p-4 bg-white border rounded-[10px]">
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

      {/*========= Кнопка раскрыть комментарии ==========*/}
      <div className="relative">
        <div
          className={`absolute bottom-0 w-6 h-6 text-gray hover:text-gray-dark cursor-pointer z-30 ${
            isOpenComments ? "-right-1 -top-9" : "right-6"
          }`}
        >
          <ChevronsDown
            onClick={() => setIsOpenComments(!isOpenComments)}
            className={`${isOpenComments ? "rotate-180" : ""}`}
          />
          <p
            className={`absolute -top-2 right-0 text-xs ${
              isOpenComments ? "hidden" : "block"
            }`}
          >
            {isComments.length}
          </p>
        </div>

        {/*========= Блок с Комментариями ==========*/}
        {isOpenComments && (
          <div className="mt-3 w-full">
            <h6 className="font-semibold text-sm text-center">Комментарии</h6>
            {isComments.map((item) => (
              <div key={item._id.toString()} className="relative group">
                <p className="w-full mt-2 p-1 text-sm border-1 rounded cursor-pointer">
                  {item.text}
                </p>
                <div className="absolute z-10 hidden group-hover:block bg-gray text-xs rounded p-1 whitespace-nowrap bottom-full right-0 mb-0">
                  {deadLineToDate(item.createdAt)}
                </div>
              </div>
            ))}
            <ListTodo
              inputType="comment"
              id={todo._id.toString()}
              keyObj="comment"
              cssClass="!w-11/12"
            />
          </div>
        )}

        {/*========= Кнопка удалить карточку ==========*/}
        {!isOpenComments && <ButtomDeleteTodo idTodo={todo._id.toString()} />}
      </div>
    </div>
  );
}

export default TodoCard;
