import { auth } from '@/auth';
import React from 'react';
import Company from '@/model/company-model';
import FormNewCompany from '@/components/todo/FormNewCompany';

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
        <div className="min-h-screen relative p-4">
          <h2 className="text-xl font-medium">Организации</h2>
          <div className="relative ml-4 flex gap-4">
            {data.map((item) => (
              <p key={item._id}>{item.title}</p>
            ))}

            <div>
              <h3 className="mt-8">Добавить новую организацию</h3>
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
