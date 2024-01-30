import React, { ReactElement } from "react";
import Header from "./header";
import styled from "@emotion/styled";
import MainMenu from "./menu";

interface LayoutProps {
  children: ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutWrapper>
      {/*<Header />*/}
      <div className="wrapper">
        <MainMenu />
        <div className="content">{children}</div>
      </div>
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = styled("div")`
  overflow: hidden;
  height: 100vh;
  position: relative;

  .wrapper {
    display: flex;
    height: 100%;
  }
  .content {
    overflow-y: scroll;
    padding: 3rem 3.5rem 2rem;
    flex: 1;
  }
`;