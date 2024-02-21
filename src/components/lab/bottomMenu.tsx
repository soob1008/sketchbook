import styled from "@emotion/styled";
import {
  HomeOutlined,
  ShopOutlined,
  FileTextOutlined,
  FormatPainterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

const MENUS = [
  {
    title: "홈",
    icon: <HomeOutlined />,
  },
  {
    title: "둘러보기",
    icon: <FileTextOutlined />,
  },
  {
    title: "쇼핑",
    icon: <ShopOutlined />,
  },
  {
    title: "인테리어/생활",
    icon: <FormatPainterOutlined />,
  },
  {
    title: "마이페이지",
    icon: <UserOutlined />,
  },
];

const BottomMenu = () => {
  return (
    <BottomMenuNav>
      <ul>
        {MENUS.map((menu) => (
          <BottomMenuItem>
            <Link to="/" className="link">
              {menu.icon}
              <b>{menu.title}</b>
            </Link>
          </BottomMenuItem>
        ))}
      </ul>
    </BottomMenuNav>
  );
};

export default BottomMenu;

const BottomMenuNav = styled("nav")`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top: 1px solid #e2e2e2;
  ul {
    display: flex;
  }
`;

const BottomMenuItem = styled("li")`
  flex: 1;
  .link {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 0;
    text-decoration: none;
    span {
      color: #222222;
      font-size: 22px;
    }
    b {
      display: block;
      margin-top: 6px;
      font-size: 10px;
      color: #222222;
    }
  }
`;