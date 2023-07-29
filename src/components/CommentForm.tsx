import { useAuth0 } from '@auth0/auth0-react';
import { FormEvent, useState } from 'react';

type Props = {
  text: string;
  setText: Function;
  onSubmit: (e: React.FormEvent) => Promise<void>;
};

const CommentForm = ({ text, setText, onSubmit }: Props) => {
  const { logout } = useAuth0();

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col items-end gap-2">
        <textarea
          className="w-full rounded p-3 max-h-40 min-h-[65px] focus:outline-none dark:bg-stone-800 dark:placeholder:text-gray-400"
          placeholder="Escreva seu comentário aqui"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="flex sm:gap-2 gap-4 font-medium mt-2">
          <button
            type="button"
            className="text-red-500 border-red-500 border px-7 py-2 sm:px-4 rounded"
            onClick={() => logout()}
          >
            Sair
          </button>
          <button type="submit" className="bg-gray-700 text-white px-7 py-2 sm:px-4 rounded">
            Enviar
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
