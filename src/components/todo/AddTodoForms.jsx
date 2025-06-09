// 'use client';

// import { createTodos } from '@/lib/actionTodo';
// import { useRef, useState } from 'react';
// import SubmitButton from '../SubmitButton';

// export default function AddTodoForm() {
//   const [show, setShow] = useState(true);
//   const ref = useRef(null);

//   return (
//     <div className={show ? `absolute` : `relative`}>
//       {show ? (
//         <button
//           className="w-80 mb-1 text-center text-base font-bold z-10"
//           onClick={() => setShow(!show)}
//         >
//           Добавить новую задачу
//         </button>
//       ) : (
//         <>
//           <button
//             className="w-80 mb-1 text-center text-base font-bold"
//             onClick={() => setShow(!show)}
//           >
//             Отменить добавление
//           </button>

//           <form
//             ref={ref}
//             action={async (FormData) => {
//               ref.current?.reset();
//               await createTodos(FormData);
//               setShow(!show);
//             }}
//             className="w-80 my-4 p-4 flex flex-col outset rounded-xl text-sm"
//           >
//             <label htmlFor="title" className="py-2">
//               Название
//             </label>
//             <input
//               type="text"
//               name="title"
//               className="mb-2 w-full py-2 px-3 inset"
//               required
//             />

//             <label htmlFor="description" className="py-2">
//               Описание
//             </label>
//             <textarea
//               type="text"
//               name="description"
//               className="mb-2 w-full py-2 px-3 inset"
//               required
//               rows="3"
//               cols="20"
//             />
//             {/* <input
//         type="text"
//         name="description"
//         className="mb-2 w-62 h-10 p-2"
//         required
//       /> */}

//             <label htmlFor="company" className="py-2">
//               Организация
//             </label>
//             <input
//               type="text"
//               name="company"
//               className="mb-2 w-full py-2 px-3 inset"
//               required
//             />

//             <label htmlFor="todoDeadline" className="py-2">
//               Дедлайн
//             </label>
//             <input
//               type="date"
//               name="todoDeadline"
//               className="w-full py-2 px-3 inset"
//               required
//             />

//             <SubmitButton
//               cssStyle="bg-blue text-white w-11/12"
//               text="Добавить задачу"
//               textLoad="Добавление..."
//             />
//           </form>
//         </>
//       )}
//     </div>
//   );
// }
