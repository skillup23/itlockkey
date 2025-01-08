import ListTodo from "@/components/todo/ListTodo";
import Todo from "@/model/todoModel";

export default async function TodoDetailsPage({ params: { id } }) {
  const todo = await Todo.findOne({ _id: id });
  const data = JSON.parse(JSON.stringify(todo));

  const commentsTest = [
    "Тестовый комментарий 1",
    "Заметка 2",
    "Длинный комментарий с большим колличеством текста, написанный, чтобы все это посмотреть, как это все получается и удается",
  ];

  const deadLineToDate = (todoDeadline) => {
    const deadlineDate = new Date(todoDeadline);

    // Extracting day, month, and year components from the Date object
    const day = deadlineDate.getDate();
    const month = deadlineDate.getMonth() + 1; // Months are zero-based, so add 1
    const year = deadlineDate.getFullYear();

    // Formatting the date as MM/DD/YYYY
    return `${day}.${month}.${year}`;
  };

  const currentDateCrt = new Date(data.createdAt);
  const currentDateUpd = new Date(data.updatedAt);
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const dateCreate = currentDateCrt.toLocaleDateString("ru-RU", options);
  const dateUpdate = currentDateUpd.toLocaleDateString("ru-RU", options);

  return (
    <div className="px-6 py-4 flex flex-col justify-center items-center">
      <ul className="w-full flex justify-between text-xs">
        <li>
          <h6 className="text-gray-light">ID заявки</h6>
          <p>{data._id}</p>
        </li>
        <li>
          <h6 className="text-gray-light">Дата создания</h6>
          <p>{dateCreate}</p>
        </li>
        <li>
          <h6 className="text-gray-light">Дата обновления</h6>
          <p>{dateUpdate}</p>
        </li>
        <li>
          <h6 className="text-gray-light">Постановщик</h6>
          <p>Роберт Анисимов</p>
        </li>
        <li>
          <h6 className="text-gray-light">Исполнитель</h6>
          <p>Роберт Анисимов</p>
        </li>
        <li>
          <h6 className="text-gray-light">Приоритет</h6>
          <p>Средний</p>
        </li>
      </ul>

      <div className="mt-6 w-full flex gap-8">
        <ul className="w-2/3">
          <li>
            <h6 className="p-1 text-gray-light">Название</h6>
            <ListTodo todo={data} keyObj="title" info={data.title} />
          </li>
          <li className="mt-6">
            <h6 className="p-1 text-gray-light">Описание</h6>
            <ListTodo
              todo={data}
              keyObj="description"
              info={data.description}
              inputType="textarea"
            />
          </li>
          <li className="mt-6">
            <h6 className="p-1 text-gray-light">Комментарии</h6>
            <div className="w-full mb-2 p-4 inset rounded">
              {commentsTest.map((comm, index) => (
                <p className="mb-4 p-2 bg-blue-light rounded" key={index}>
                  {comm}
                </p>
              ))}
            </div>
          </li>
        </ul>

        <ul className="w-1/3">
          <li>
            <h2 className="p-1 text-gray-light">Организация</h2>
            <ListTodo todo={data} keyObj="company" info={data.company} />
          </li>
          <li className="mt-6">
            <h6 className="p-1 text-gray-light">Дедлайн</h6>
            <ListTodo
              todo={data}
              keyObj="todoDeadline"
              info={deadLineToDate(data.todoDeadline)}
              inputType="date"
            />
          </li>
          <li className="mt-6">
            <h6 className="text-[#69696a]">Статус</h6>
            <ListTodo
              todo={data}
              keyObj="status"
              info={data.status}
              inputType="select"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
