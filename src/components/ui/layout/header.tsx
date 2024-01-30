import React from "react";
import { MenuOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <HeaderWrapper>
      <button type="button">
        <MenuOutlined />
      </button>
      <Link to="/">SketchBook</Link>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled("header")(({ theme }) => ({
  position: "sticky",
  top: 0,
  right: 0,
  left: 0,
  padding: "2rem 0",
  width: "100%",
  backgroundColor: "yellow",
}));