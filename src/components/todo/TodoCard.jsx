'use client';

import { ChevronsDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ButtomDeleteTodo from './ButtomDeleteTodo';
import ListTodo from './ListTodo';

function TodoCard(todo, userName) {
  // const [isDeadlineBorder, setIsDeadlineBorder] = useState('');
  const [isOpenComments, setIsOpenComments] = useState(false);
  const [isComments, setIsComments] = useState('');

  // // Загрузка комментариев
  // useEffect(() => {
  //   const fetchComments = async () => {
  //     const data = await todo;
  //     setIsComments(JSON.parse(data.comments));
  //   };
  //   fetchComments();
  // }, [todo]);

  useEffect(() => {
    setIsComments(JSON.parse(todo.comments));
  }, [todo]);

  const dateNow = new Date();
  const dateDeadline = new Date(todo.todoDeadline);
  const totalDate = Math.ceil((dateDeadline - dateNow) / (1000 * 60 * 60 * 24));

  const colorBorder = (time, status) => {
    if (status === 'Закрыта') {
      return 'border-blue-400';
    } else if (time < 1) {
      return 'border-red-400';
    } else if (time < 3) {
      return 'border-orange-300';
    } else {
      return '';
    }
  };

  // colorBorder(totalDate);

  //изменение формата даты дд.мм.гггг
  const deadLineToDate = (todoDeadline) => {
    const currentDeadline = new Date(todoDeadline);
    const deadline = currentDeadline.toISOString().substring(0, 10);

    return deadline;
    // const currentDateCrt = new Date(data.createdAt);
    // const currentDateUpd = new Date(data.updatedAt);
    // const options = {
    //   hour: "numeric",
    //   minute: "numeric",
    //   second: "numeric",
    // };
    // const dateCreate = currentDateCrt.toLocaleDateString("ru-RU", options);
    // const dateUpdate = currentDateUpd.toLocaleDateString("ru-RU", options);
  };

  return (
    <div
      className={`h-fit relative w-80 p-4 bg-white border ${colorBorder(
        totalDate,
        todo.status
      )} rounded-[10px]`}
    >
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
          className={`absolute w-6 h-6 text-gray hover:text-gray-dark cursor-pointer z-30 -right-1 -top-6`}
        >
          <ChevronsDown
            onClick={() => setIsOpenComments(!isOpenComments)}
            className={`${isOpenComments ? 'rotate-180 -top-6' : ''}`}
          />
          <p
            className={`absolute -top-2 right-0 text-xs ${
              isOpenComments ? 'hidden' : 'block'
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
