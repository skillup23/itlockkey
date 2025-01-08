import AddTodoForm from "@/components/todo/AddTodoForms";
import AllTodos from "@/components/todo/AllTodos";

export default function Todos() {
  return (
    <div className="min-h-screen relative">
      <h2 className="mt-2 mb-6 text-2xl font-bold text-center">Задачи</h2>
      <div className="relative ml-4 flex gap-4">
        <AddTodoForm />

        {/* <h2 className="text-center text-green-400 font-bold mb-4">
            Текущие задачи
          </h2> */}
        <AllTodos />
      </div>
    </div>
  );
}
