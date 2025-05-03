import React from "react";
import ButtomDeleteTodo from "./ButtomDeleteTodo";
import ListTodo from "./ListTodo";

export default function AllTodos({ todos }) {
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
    <div className="mt-12">
      <div className="absolute top-0 left-[332px]">
        <button className="w-80 mb-1 text-center text-base font-bold">
          Фильтры задач
        </button>
      </div>

      <div className="flex gap-5 flex-wrap">
        {todos.reverse().map((todo) => (
          <div
            key={todo._id}
            className="relative w-65 p-4 bg-white border rounded-[10px]"
          >
            <div className="flex flex-col gap-3">
              <ListTodo
                todo={JSON.parse(JSON.stringify(todo))}
                keyObj="title"
                info={todo.title}
                cssClass="text-base leading-5 font-semibold"
              />
              <ListTodo
                todo={JSON.parse(JSON.stringify(todo))}
                keyObj="status"
                info={todo.status}
                inputType="selectStatus"
              />
              <ListTodo
                todo={JSON.parse(JSON.stringify(todo))}
                keyObj="todoDeadline"
                info={deadLineToDate(todo.todoDeadline)}
                inputType="date"
              />
              <ListTodo
                todo={JSON.parse(JSON.stringify(todo))}
                keyObj="description"
                info={todo.description}
              />
              <ListTodo
                todo={JSON.parse(JSON.stringify(todo))}
                keyObj="company"
                info={todo.company}
                inputType="selectCompany"
              />
            </div>
            <ButtomDeleteTodo idTodo={todo._id.toString()} />

            {/* <h6 className="text-balance whitespace-pre-line">
              {todo.description}
            </h6> */}
            {/* <div className="w-full flex justify-between">
              <h6>{todo.company}</h6>
              <p>{deadLineToDate(todo.todoDeadline)}</p>
            </div> */}
            {/* <div className="flex justify-between gap-4">
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
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
