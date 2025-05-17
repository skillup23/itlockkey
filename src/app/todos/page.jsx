import { auth } from "@/auth";
import AllTodos from "@/components/todo/AllTodos";
import Todo from "@/model/todoModel";

export default async function Todos() {
  const session = await auth();
  const loggedInUser = session?.user;
  const userName = loggedInUser?.name;

  try {
    const todos = await Todo.find();

    const data = todos
      .filter((item) => item.executor === userName)
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

    // const dataUser = data.filter((item) => item.executor === userName);

    // console.log(data);

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
