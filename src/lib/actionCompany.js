"use server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/mongo";
import Company from "@/model/company-model";
import { revalidatePath } from "next/cache";

export const createCompany = async (formData) => {
  await dbConnect();
  const title = formData.get("title");
  const session = await auth();
  const loggedInUser = session?.user;
  const userName = loggedInUser?.name;

  try {
    const newCompany = await Company.create({
      title,
      autor: userName,
    });
    newCompany.save();
    revalidatePath("/todos/all-company");

    return newCompany.toString();
  } catch (error) {
    console.log(error);
    return { message: "ошибка создания организации" };
  }
};

// Новый метод удаления
export const deleteCompany = async (id) => {
  try {
    await Company.deleteOne({ _id: id });
    // Запуск повторной проверки указанного пути ("/todo")
    revalidatePath("/todo");
    return "организация удалена";
  } catch (error) {
    return { message: "ошибка удаления организации" };
  }
};
