import React from 'react';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({ cssStyle, text, textLoad }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      {...(pending && { disabled: true })}
      className={`mt-10 mx-auto ${
        pending ? 'cursor-not-allowed' : 'cursor-pointer'
      } ${cssStyle}`}
    >
      {pending ? textLoad : text}
    </button>
  );
}

{
  /* <button
      type="submit"
      {...(pending && { disabled: true })}
      className={`bg-blue-400 h-10 w-62 p-2 mt-10 rounded text-white font-bold ${
        pending ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {pending ? 'Добавление...' : 'Добавить задачу'}
    </button> */
}
