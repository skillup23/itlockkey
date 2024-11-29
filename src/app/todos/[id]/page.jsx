import FormsEdit from '@/components/todo/FormsEdit';
import ListTodo from '@/components/todo/ListTodo';
import TestTodo from '@/components/todo/test';
import Todo from '@/model/todoModel';

export default async function TodoDetailsPage({ params: { id } }) {
  const todo = await Todo.findOne({ _id: id });
  const data = JSON.parse(JSON.stringify(todo));

  return (
    <div className="flex flex-col justify-center items-center p-8">
      {/* <div>
        <h2>{todo.title}</h2>
        <div>Изменить</div>
      </div> */}
      <h2>Название</h2>
      <ListTodo todo={data} keyObj="title" info={todo.title} />
      <h2>Описание</h2>
      <ListTodo todo={data} keyObj="description" info={todo.description} />

      {/* <FormsEdit todo={todo} /> */}
      {/* <TestTodo /> */}
    </div>
  );
}
