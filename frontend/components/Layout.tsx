import { useTheme } from 'next-themes';
import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ children, categories, seo }: any) => {
  return (
    <>
      <div className={`h-full`}>
        <div className="w-full bg-stone-100 dark:bg-stone-900 dark:text-white h-full overflow-auto">
          <div className=" max-w-4xl mx-auto sm:px-10 px-4 pb-6">
            <Nav />
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
