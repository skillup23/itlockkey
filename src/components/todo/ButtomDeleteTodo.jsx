"use client";

import { deleteTodoNew } from "@/lib/actionTodo";
import { Trash2 } from "lucide-react";
import { useRef } from "react";

function ButtomDeleteTodo(idTodo) {
  const dialogRef = useRef(null);

  const handleBackdropClick = (e) => {
    // Закрываем только если клик был именно по dialog (не по его содержимому)
    if (e.target === dialogRef.current) {
      dialogRef.current.close();
    }
  };

  // Немедленно отправляем форму при изменении выбора
  const handleChange = (e) => {
    e.target.form.requestSubmit();
    dialogRef.current.close();
  };

  return (
    <div className="relative">
      <Trash2
        onClick={() => dialogRef.current.showModal()}
        className="absolute bottom-4 right-4 w-4 text-gray hover:text-gray-dark cursor-pointer"
      />
      <dialog
        ref={dialogRef}
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 backdrop:bg-black backdrop:opacity-20"
        onClick={handleBackdropClick}
      >
        <h2>Подтвердите удаление</h2>
        <form
          action={async () => {
            await deleteTodoNew(idTodo);
          }}
        >
          <input hidden type="text" name="id" defaultValue={idTodo} />
          <button
            onClick={() => dialogRef.current.close()}
            className="border rounded-sm px-2 bg-red-400"
          >
            Удалить
          </button>
          <div
            onClick={() => dialogRef.current.close()}
            className="border rounded-sm px-2 bg-red-400 cursor-pointer"
          >
            Нет
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default ButtomDeleteTodo;
