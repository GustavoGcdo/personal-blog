import { useRouter } from 'next/router';
import React from 'react';

const BackButton = () => {
  const router = useRouter();

  return (
    <div
      className="group sm:flex hidden cursor-pointer items-center rounded px-3 py-1 w-fit border-2 border-stone-800 hover:text-white hover:bg-stone-800 transition-all ease-in-out"
      onClick={() => router.back()}
    >
      <svg
        className="h-5 w-5 text-black group-hover:text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>

      <span className="ml-2 text-lg font-primary">voltar</span>
    </div>
  );
};

export default BackButton;