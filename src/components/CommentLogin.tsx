import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const CommentLogin = () => {
  const { loginWithPopup } = useAuth0();
  
  return (
    <div
      className="flex gap-2 bg-gray-700 items-center w-fit text-white p-3 rounded mx-auto cursor-pointer"
      onClick={() => loginWithPopup()}
    >
      <div>Faça login para comentar</div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
        />
      </svg>
    </div>
  );
};

export default CommentLogin;
