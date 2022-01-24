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

        <div>
          <ul className="flex flex-row space-x-3 text-lg">
            <li className="transition-all ease-in-out duration-300 rounded hover:bg-black hover:text-white px-3 py-1">
              <Link href="/">
                <a>Página inicial</a>
              </Link>
            </li>
            <li className="transition-all ease-in-out duration-300 rounded hover:bg-black hover:text-white px-3 py-1">
              <Link href="/about">
                <a>Sobre mim</a>
              </Link>
            </li>          
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
