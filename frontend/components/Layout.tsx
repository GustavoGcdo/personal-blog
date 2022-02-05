import { useState } from 'react';
import Nav from './Nav';

const Layout = ({ children, categories, seo }: any) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  return (
    <>
      <div className={theme}>
        <div className="w-full dark:bg-stone-900 dark:text-white">
          <div className=" max-w-6xl mx-auto sm:px-10 px-4 pb-20">
            <Nav changeTheme={(theme) => setTheme(theme)} />
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
