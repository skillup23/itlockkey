"use client";

import { deleteTodoNew } from "@/lib/actionTodo";
import { Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";

function ButtomDeleteTodo(idTodo) {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useFormState(deleteTodoNew, null);

  // Закрываем модальное окно после успешной отправки
  if (state?.success) {
    setTimeout(() => setIsOpen(false), 1000);
  }

  return (
    <div className="relative">
      <Trash2
        onClick={() => setIsOpen(true)}
        className="absolute bottom-0 right-0 w-4 text-gray hover:text-gray-dark cursor-pointer"
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
    </div>
  );
}

export default ButtomDeleteTodo;
