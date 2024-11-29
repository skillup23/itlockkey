'use server';
import Todo from '@/model/todoModel';
import { revalidatePath } from 'next/cache';
import { dbConnect } from '@/lib/mongo';

export const createTodos = async (formData) => {
  await dbConnect();
  // Извлечение содержимого и времени выполнения задачи из formData
  const title = formData.get('title');
  const description = formData.get('description');
  const company = formData.get('company');
  const todoDeadline = formData.get('todoDeadline');
  try {
    // Создание новой задачи с помощью модели Todo
    const newTodo = await Todo.create({
      title,
      description,
      company,
      todoDeadline,
    });
    // Сохранение нового элемента в списке дел
    newTodo.save();
    // Запуск повторной проверки указанного пути ("/todo")
    revalidatePath('/todo');
    // Возврат строкового представления нового элемента в списке дел
    return newTodo.toString();
  } catch (error) {
    console.log(error);
    return { message: 'ошибка создания задачи' };
  }
};

// Удаление задачи с указанным идентификатором
export const deleteTodo = async (id) => {
  // Извлечение идентификатора задачи
  const todoId = id.get('id');
  try {
    await Todo.deleteOne({ _id: todoId });
    // Запуск повторной проверки указанного пути ("/todo")
    revalidatePath('/todo');
    return 'задача удалена';
  } catch (error) {
    return { message: 'ошибка удаления задачи' };
  }
};

// Обновление задачи с указанным идентификатором
export const updateTodos = async (id, FormData, keyObj) => {
  const update = FormData.get(keyObj);

  try {
    if (keyObj === 'title') {
      await Todo.updateOne(
        { _id: id },
        {
          title: update,
        }
      );
    } else if (keyObj === 'description') {
      await Todo.updateOne(
        { _id: id },
        {
          description: update,
        }
      );
    }

    revalidatePath('/todo/[id]', 'page');
    return 'Задача обновлена';
  } catch (error) {
    return { message: 'ошибка обновления данных' };
  }
};
