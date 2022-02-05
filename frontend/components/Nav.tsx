import Link from 'next/link';
import React from 'react';
import { Theme } from './Layout';

type Props = {
  theme: Theme;
  onToggleTheme: () => void;
};

const Nav = (props: Props) => {
  return (
    <div>
      <nav className="flex flex-row justify-between py-5 items-center font-primary">
        <div className="text-2xl">
          <Link href="/">
            <a>Gustavo Oliveira</a>
          </Link>
        </div>

        <div className="flex flex-row space-x-3 text-xl ">
          <div onClick={() => props.onToggleTheme()}>
            <svg
              className={`h-8 w-8 cursor-pointer  ${
                props.theme == 'dark' ? 'fill-white text-white' : ' text-black'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <Link href="/" passHref>
            <div className="sm:block hidden border-2 border-stone-800 transition-all ease-in-out duration-300 rounded hover:border-stone-800 hover:bg-stone-800 hover:text-white px-3 py-1 cursor-pointer dark:border-white dark:hover:bg-white dark:hover:text-stone-900">
              <span>Página inicial</span>
            </div>
          </Link>
          <Link href="/about" passHref>
            <div className="block border-2 border-stone-800 transition-all ease-in-out duration-300 rounded hover:border-stone-800 hover:bg-stone-800 hover:text-white px-3 py-1 cursor-pointer dark:border-white dark:hover:bg-white dark:hover:text-stone-900">
              <span>Sobre mim</span>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
