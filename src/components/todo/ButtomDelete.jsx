"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import SubmitButton from "../SubmitButton";

function ButtomDeleteTodo({ idItem, cssClass, onSubmitAction }) {
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
        className={`w-5 hover:text-gray-dark cursor-pointer ${cssClass}`}
      />
      {isOpen && (
        <div className="absolute -top-4 -right-16 p-2 bg-white border rounded-[10px] text-base z-30">
          <h6 className="text-center">Удалить?</h6>
          <form
            action={async () => {
              await onSubmitAction(idItem);
            }}
          >
            <div className="flex">
              <input hidden type="text" name="id" defaultValue={idItem} />
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
