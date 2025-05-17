"use server";
import { dbConnect } from "@/lib/mongo";
import Todo from "@/model/todoModel";
import { revalidatePath } from "next/cache";

export const createTodos = async (formData) => {
  await dbConnect();
  // Извлечение содержимого и времени выполнения задачи из formData
  const title = formData.get("title");
  const description = formData.get("description");
  const company = formData.get("company");
  const todoDeadline = formData.get("todoDeadline");
  const status = formData.get("status");
  const executor = formData.get("executor");
  const manager = formData.get("manager");
  try {
    // Создание новой задачи с помощью модели Todo
    const newTodo = await Todo.create({
      title,
      description,
      company,
      todoDeadline,
      status,
      executor,
      manager,
    });
    // Сохранение нового элемента в списке дел
    newTodo.save();
    // Запуск повторной проверки указанного пути ("/todo")
    revalidatePath("/todo");
    // Возврат строкового представления нового элемента в списке дел
    return newTodo.toString();
  } catch (error) {
    console.log(error);
    return { message: "ошибка создания задачи" };
  }
};

// Удаление задачи с указанным идентификатором
export const deleteTodo = async (id) => {
  // Извлечение идентификатора задачи
  const todoId = id.get("id");

  try {
    await Todo.deleteOne({ _id: todoId });
    // Запуск повторной проверки указанного пути ("/todo")
    revalidatePath("/todo");
    return "задача удалена";
  } catch (error) {
    return { message: "ошибка удаления задачи" };
  }
};

// Новый метод удаления
export const deleteTodoNew = async (id) => {
  // Извлечение идентификатора задачи
  const todoId = id.idTodo;

  try {
    await Todo.deleteOne({ _id: todoId });
    // Запуск повторной проверки указанного пути ("/todo")
    revalidatePath("/todo");
    return "задача удалена";
  } catch (error) {
    return { message: "ошибка удаления задачи" };
  }
};

// Обновление задачи с указанным идентификатором
export const updateTodos = async (id, FormData, keyObj) => {
  const update = FormData.get(keyObj);

  try {
    if (keyObj === "title") {
      await Todo.updateOne(
        { _id: id },
        {
          title: update,
        }
      );
    } else if (keyObj === "description") {
      await Todo.updateOne(
        { _id: id },
        {
          description: update,
        }
      );
    } else if (keyObj === "company") {
      await Todo.updateOne(
        { _id: id },
        {
          company: update,
        }
      );
    } else if (keyObj === "todoDeadline") {
      await Todo.updateOne(
        { _id: id },
        {
          todoDeadline: update,
        }
      );
    } else if (keyObj === "status") {
      await Todo.updateOne(
        { _id: id },
        {
          status: update,
        }
      );
    } else if (keyObj === "executor") {
      await Todo.updateOne(
        { _id: id },
        {
          executor: update,
        }
      );
    } else if (keyObj === "manager") {
      await Todo.updateOne(
        { _id: id },
        {
          manager: update,
        }
      );
    } else if (keyObj === "comment") {
      console.log(update);
      await Todo.updateOne(
        { _id: id },
        { $push: { comments: { text: update } } }, // Добавляем просто строку
        { new: true } // в конец массива
      );
    }

    // revalidatePath("/todo/[id]", "page");
    revalidatePath("/todos", "page");
    return "Задача обновлена";
  } catch (error) {
    return { message: "ошибка обновления данных" };
  }
};
