import { useEffect, useState } from 'react';
import Nav from './Nav';

export type Theme = 'dark' | 'light';
const Layout = ({ children, categories, seo }: any) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const theme = localStorage.getItem('b-gcdo:theme');
    if (theme) {
      setTheme(JSON.parse(theme));
    }
  }, []);

  const saveTheme = (theme: Theme) => {
    localStorage.setItem('b-gcdo:theme', JSON.stringify(theme));
  };

  const toggleTheme = () => {
    setTheme((old) => {
      let newTheme: Theme = 'dark';
      if (old == 'dark') {
        newTheme = 'light';
      }

      saveTheme(newTheme);
      return newTheme;
    });
  };

  return (
    <>
      <div className={theme}>
        <div className="w-full dark:bg-stone-900 dark:text-white">
          <div className=" max-w-6xl mx-auto sm:px-10 px-4 pb-20">
            <Nav theme={theme} onToggleTheme={toggleTheme} />
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
