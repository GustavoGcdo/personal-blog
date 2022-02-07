import { useEffect, useState } from 'react';
import Nav from './Nav';

export type Theme = 'dark' | 'light';
const Layout = ({ children, categories, seo }: any) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const themeLocal = localStorage.getItem('b-gcdo:theme');
    if (themeLocal && themeLocal != theme) {
      setTheme(JSON.parse(themeLocal));
    }
  }, [theme]);

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
      <div className={`${theme} h-full`}>
        <div className="w-full dark:bg-stone-900 dark:text-white h-full overflow-auto">
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
