import { auth } from "@/auth";
import ArchTodos from "@/components/todo/ArchTodos";
import Todo from "@/model/todoModel";

export default async function archTodos() {
  const session = await auth();
  const loggedInUser = session?.user;
  const userName = loggedInUser?.name;

  try {
    const todos = await Todo.find();

    const data = todos
      .filter((item) => item.executor === userName && item.status === "Архив")
      .map((item) => {
        let {
          _id,
          title,
          description,
          company,
          todoDeadline,
          status,
          createdAt,
          updatedAt,
          executor,
          manager,
          comments,
        } = item;
        return {
          _id: _id.toString(),
          title,
          description: description.toString(),
          todoDeadline: todoDeadline.toString(),
          company,
          status,
          createdAt: createdAt.toString(),
          updatedAt: updatedAt.toString(),
          executor,
          manager,
          comments: JSON.stringify(comments),
        };
      });

    if (data.length === 0) {
      return (
        <div className="min-h-screen relative p-4">
          <h2 className="text-xl font-medium">У вас нет задач в архиве</h2>
        </div>
      );
    } else {
      return (
        <div className="min-h-screen relative p-4">
          <h2 className="text-xl font-medium">Задачи</h2>
          <div className="relative ml-4 flex gap-4">
            <ArchTodos todos={data} userName={userName} />
          </div>
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }
}
