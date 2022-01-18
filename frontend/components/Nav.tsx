import React from 'react';
import Link from 'next/link';

const Nav = () => {
  return (
    <div>
      <nav className="flex flex-row justify-between py-8">
        <div className='text-2xl'>
          <Link href="/">
            <a>Gustavo Oliveira</a>
          </Link>
        </div>

        <div>
          <ul className="flex flex-row space-x-10 text-lg">
            <li>
              <Link href="/">
                <a>Página inicial</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Sobre mim</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Contato</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
