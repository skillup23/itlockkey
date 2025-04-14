import AllTodos from "@/components/todo/AllTodos";
import Todo from "@/model/todoModel";

export default async function Todos() {
  try {
    const todos = await Todo.find();
    if (todos.length === 0) {
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
            <AllTodos todos={todos} />
          </div>
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }
}
