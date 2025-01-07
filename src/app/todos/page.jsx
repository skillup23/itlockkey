import AddTodoForm from "@/components/todo/AddTodoForms";
import AllTodos from "@/components/todo/AllTodos";

export default function Todos() {
  return (
    <div className="min-h-screen relative">
      <h2 className="mt-2 mb-6 text-2xl font-bold text-center">Задачи</h2>
      <div className="flex items-start gap-8">
        <div className="flex justify-around flex-col items-center">
          <AddTodoForm />
        </div>

        <div className="w-full flex flex-col items-center">
          <AllTodos />
        </div>
      </div>
    </div>
  );
}
