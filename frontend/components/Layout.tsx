import Nav from './Nav';

const Layout = ({ children, categories, seo }: any) => (
  <>
    <div className="max-w-6xl mx-auto px-10 pb-20">
      <Nav />
      {children}
    </div>
  </>
);

export default Layout;
