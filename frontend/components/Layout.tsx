import Nav from './Nav';

const Layout = ({ children, categories, seo }: any) => (
  <>
    <div className="max-w-6xl mx-auto sm:px-10 px-4 pb-20">
      <Nav />
      {children}
    </div>
  </>
);

export default Layout;
