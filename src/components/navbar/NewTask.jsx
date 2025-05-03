"use client";

import { ChevronsRight } from "lucide-react";
import { useRef } from "react";
import FormNewTask from "../todo/FormNewTask";

export default function NewTask({ children }) {
  const dialogRef = useRef(null);

  const handleBackdropClick = (e) => {
    // Закрываем только если клик был именно по dialog (не по его содержимому)
    if (e.target === dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <div>
      <div
        onClick={() => dialogRef.current.showModal()}
        className="flex items-center cursor-pointer gap-[11px] hover:text-black"
      >
        {children}
      </div>

      <dialog
        ref={dialogRef}
        className="relative"
        onClick={handleBackdropClick}
      >
        <FormNewTask>
          <ChevronsRight
            onClick={() => dialogRef.current.close()}
            className="cursor-pointer"
          />
        </FormNewTask>
      </dialog>
    </div>
  );
}
