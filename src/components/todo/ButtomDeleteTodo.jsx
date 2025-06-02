'use client';

import { deleteTodoNew } from '@/lib/actionTodo';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import SubmitButton from '../SubmitButton';

function ButtomDeleteTodo(idTodo) {
  // const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  // const [state, formAction] = useFormState(deleteTodoNew, null);

  // Закрываем модальное окно после успешной отправки
  // if (state?.success) {
  //   setTimeout(() => setIsOpen(false), 1000);
  // }

  return (
    <>
      <Trash2
        onClick={() => setIsOpen(true)}
        className="absolute bottom-0 right-6 w-5 text-gray hover:text-gray-dark cursor-pointer"
      />
      {isOpen && (
        <div className="absolute -top-4 -right-16 p-2 bg-white border rounded-[10px] text-base z-30">
          <h6 className="text-center">Удалить?</h6>
          <form
            action={async () => {
              await deleteTodoNew(idTodo);
            }}
          >
            <div className="flex">
              <input hidden type="text" name="id" defaultValue={idTodo} />
              <SubmitButton
                textLoad="..."
                text="Да"
                cssStyle="border rounded-sm px-2 bg-red-400"
              />
              <div
                onClick={() => setIsOpen(false)}
                className="border rounded-sm px-2 py-1 bg-red-400 cursor-pointer"
              >
                Нет
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ButtomDeleteTodo;
