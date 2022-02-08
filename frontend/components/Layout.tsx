import { useTheme } from 'next-themes';
import Nav from './Nav';

const Layout = ({ children, categories, seo }: any) => {
  return (
    <>
      <div className={`h-full`}>
        <div className="w-full dark:bg-stone-900 dark:text-white h-full overflow-auto">
          <div className=" max-w-6xl mx-auto sm:px-10 px-4 pb-20">
            <Nav />
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
