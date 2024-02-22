import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface LayoutProps {
  children: ReactJSXElement;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main>
      <div style={{ paddingTop: "50px" }}>
        <div style={{ padding: "30px 12px" }}>{children}</div>
      </div>
    </main>
  );
};

export default Layout;