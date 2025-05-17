"use client";

import { company, status } from "@/data/arch";
import { updateTodos } from "@/lib/actionTodo";
import { SquareCheckBig } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Кастомный хук для debounce откладываем выполнение функции (отправку формы)
// до тех пор, пока не пройдет указанное время (2 секунды) без новых изменений.
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // При каждом новом вводе очищаем предыдущий таймер
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Обязательно очищаем при размонтировании компонента
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function ListTodo({ id, keyObj, info, inputType, cssClass }) {
  //============= Автоматическая отправка формы используя debouncedValue ===========
  const [inputValue, setInputValue] = useState("");
  const formRef = useRef(null);
  const debouncedValue = useDebounce(inputValue, 2000);

  useEffect(() => {
    if (debouncedValue && formRef.current) {
      // console.log("Отправка данных:", debouncedValue);
      formRef.current.requestSubmit();
    }
  }, [debouncedValue]);

  //============= Немедленно отправляем форму select при изменении выбора ===========
  const handleSelectChange = (e) => {
    e.target.form.requestSubmit();
  };

  //============= Автоматическое изменине высоты textarea ==============
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      // Сбрасываем высоту чтобы получить правильный scrollHeight
      textareaRef.current.style.height = "auto";
      // Устанавливаем новую высоту на основе содержимого
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  // //============= Отправка данных при клике вне input ==============
  // const handleClickOutside = (e) => {
  //   if (formRef.current && !formRef.current.contains(e.target)) {
  //     formRef.current.requestSubmit();
  //   }
  // };

  // // Добавляем обработчик при монтировании
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);

  //   // Функция cleanup - удаляем обработчик при размонтировании
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []); // Пустой массив зависимостей - эффект выполняется только при монтировании

  return (
    <>
      <form
        ref={formRef}
        action={async (FormData) => {
          await updateTodos(id, FormData, keyObj);
        }}
        className="relative w-full flex text-sm gap-2"
      >
        {inputType == "date" && (
          <input
            type="date"
            name={keyObj}
            className=""
            required
            defaultValue={info}
            onChange={handleSelectChange}
          />
        )}
        {inputType == "selectStatus" && (
          <select
            name={keyObj}
            defaultValue={info}
            onChange={handleSelectChange}
            className={`p-1 text-sm rounded ${
              info == "Открыта" && "bg-green-200"
            } ${info == "В работе" && "bg-purple-200"} ${
              info == "Ожидание" && "bg-yellow-200"
            } ${info == "Закрыта" && "bg-blue-200"} ${
              info == "Архив" && "bg-red-200"
            } `}
          >
            {status.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
            {/* <option value="Открыта">Открыта</option>
            <option value="В работе">В работе</option>
            <option value="Ожидание">Ожидание</option>
            <option value="Закрыта">Закрыта</option> */}
          </select>
        )}
        {inputType == "selectCompany" && (
          <select
            name={keyObj}
            defaultValue={info}
            onChange={handleSelectChange}
            className={`p-1 text-sm rounded bg-gray-200`}
          >
            {company.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
            {/* <option value="АНБ офис">АНБ офис</option>
            <option value="АЗС">АЗС</option>
            <option value="Химзащита">Химзащита</option>
            <option value="Никострой">Никострой</option>
            <option value="АЗС Ростов">АЗС Ростов</option>
            <option value="Дораконтинент">Дораконтинент</option> */}
          </select>
        )}
        {inputType == "textarea" && (
          <textarea
            type="text"
            name={keyObj}
            className="w-full p-2 inset"
            defaultValue={info}
            required
            rows="8"
            cols="20"
          />
        )}
        {inputType == "comment" && (
          <div className="mt-2 p-1 w-full flex border-1 rounded-md">
            <textarea
              type="text"
              name={keyObj}
              className={`w-full min-h-2 resize-none overflow-hidden ${cssClass}`}
              placeholder="Новый комментарий..."
              required
              rows={2}
              // onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="relative h-6 p-0 border-0 cursor-pointer hover:bg-inherit group"
            >
              <SquareCheckBig className="w-5 text-gray hover:text-gray-dark cursor-pointer" />
              <div className="absolute z-10 hidden group-hover:block bg-gray text-xs rounded p-1 whitespace-nowrap bottom-full right-0 mb-0">
                Сохранить
              </div>
            </button>
          </div>
        )}
        {!inputType && (
          <textarea
            ref={textareaRef}
            type="text"
            name={keyObj}
            className={`w-full min-h-2 resize-none overflow-hidden ${cssClass}`}
            defaultValue={info}
            rows={1}
            required
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}

        {/* <button
          type="submit"
          // className="absolute w-6 right-2 top-2 p-0 text-orange"
          className="w-8 h-9 p-1 text-orange bg-white"
        >
          <Save size={24} />
        </button> */}
      </form>
      {/* )} */}
    </>
  );
}
