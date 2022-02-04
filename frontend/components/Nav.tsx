import Link from 'next/link';
import React from 'react';

const Nav = () => {
  return (
    <div>
      <nav className="flex flex-row justify-between py-5 items-center font-primary">
        <div className="text-2xl">
          <Link href="/">
            <a>Gustavo Oliveira</a>
          </Link>
        </div>

        <div className="flex flex-row space-x-3 text-xl ">
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
