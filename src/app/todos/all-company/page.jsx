import { auth } from "@/auth";
import ButtomDeleteTodo from "@/components/todo/ButtomDelete";
import FormNewCompany from "@/components/todo/FormNewCompany";
import { deleteCompany } from "@/lib/actionCompany";
import Company from "@/model/company-model";
import React from "react";

export default async function AllCompany() {
  const session = await auth();
  const loggedInUser = session?.user;
  const userName = loggedInUser?.name;

  try {
    const company = await Company.find();

    const data = company
      .filter((item) => item.autor === userName)
      .map((item) => {
        let { _id, title, autor } = item;
        return {
          _id: _id.toString(),
          title,
          autor,
        };
      });

    if (data.length === 0) {
      return (
        <div className="min-h-screen relative p-4">
          <h2 className="text-xl font-medium">
            У вас нет добавленных организаций
          </h2>

          <h3 className="mt-8">Добавить новую организацию</h3>
          <FormNewCompany />
        </div>
      );
    } else {
      return (
        <div className="min-h-screen relative py-4 px-6">
          <h2 className="text-xl font-medium">Организации</h2>
          <div className="relative mt-2 flex items-start gap-8">
            <div className="flex flex-col gap-2">
              {data.map((item) => (
                <div
                  key={item._id}
                  className="relative p-1 flex justify-between items-center gap-6 bg-gray rounded"
                >
                  <p className="w-full">{item.title}</p>
                  {/* <Trash2 className="w-5 cursor-pointer" /> */}
                  <ButtomDeleteTodo
                    idItem={item._id.toString()}
                    onSubmitAction={deleteCompany}
                  />
                </div>
              ))}
            </div>

            <div className="p-1 bg-gray-light rounded">
              <h3 className="text-center">Добавить новую организацию</h3>
              <FormNewCompany />
            </div>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }
}
