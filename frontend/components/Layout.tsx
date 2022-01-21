import Nav from './Nav';

const Layout = ({ children, categories, seo }: any) => (
  <>
    <div className="md:container md:mx-auto lg:px-40 md:px-30 sm:px-5 pb-20">
      <Nav />
      {children}
    </div>
  </>
);

export default Layout;
