import AllTodos from "@/components/todo/AllTodos";
import Todo from "@/model/todoModel";

export default async function Todos() {
  try {
    const todos = await Todo.find();

    const data = todos.map((item) => {
      let {
        _id,
        title,
        description,
        company,
        todoDeadline,
        status,
        createdAt,
        updatedAt,
      } = item;
      return {
        _id: _id.toString(),
        title: title.toString(),
        description: description.toString(),
        company: company.toString(),
        todoDeadline: todoDeadline.toString(),
        status: status.toString(),
        createdAt: createdAt.toString(),
        updatedAt: updatedAt.toString(),
      };
    });

    if (data.length === 0) {
      return (
        <div className="min-h-screen relative p-4">
          <h2 className="text-xl font-medium">У вас нет текущих задач</h2>
        </div>
      );
    } else {
      return (
        <div className="min-h-screen relative p-4">
          <h2 className="text-xl font-medium">Задачи</h2>
          <div className="relative ml-4 flex gap-4">
            <AllTodos todos={data} />
          </div>
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }
}
