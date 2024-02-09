import React, { ReactElement, useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  RocketOutlined,
  CodeOutlined,
  FileTextOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { Breadcrumb, Button, Layout, Menu, MenuProps, theme, Col } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

interface LayoutProps {
  children: ReactElement;
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const menuItems: MenuItem[] = [
  getItem("laboratory", "laboratory", <CodeOutlined />, [
    getItem("todo", "todo"),
  ]),
  getItem("game", "game", <RocketOutlined />, [
    getItem("테트리스", "tetris"),
    getItem("지뢰찾기", "minesweeper"),
  ]),
  getItem("resume", "resume", <FileTextOutlined />),
];

const MainLayout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let currentPath = pathname.split("/").filter((path) => path !== "");
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken();

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [pathname]);

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`);
  };

  return (
    <Layout style={{ overflow: "hidden", height: "100vh" }}>
      <Layout style={{ height: "100%" }}>
        <NavSideBar
          width={260}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            setIsMobile(broken);
          }}
          onCollapse={(collapsed, type) => {
            setCollapsed(collapsed);
          }}
          collapsed={isCollapsed}
          zeroWidthTriggerStyle={{
            backgroundColor: colorPrimary,
          }}
          style={{
            position: isMobile ? "fixed" : "relative",
            zIndex: 10,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="logo">
            <h1>
              <Link to={"/"}>Subin</Link>
            </h1>
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["home"]}
            defaultOpenKeys={["laboratory"]}
            items={menuItems}
            onClick={onClick}
          />
        </NavSideBar>
        <Layout
          style={{
            padding: isMobile ? "0 16px 24px" : "0 24px 24px",
            overflowY: "scroll",
          }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <HomeOutlined />
            </Breadcrumb.Item>
            {currentPath.map((path) => (
              <Breadcrumb.Item key={path}>{path}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Content
            style={{
              padding: isMobile ? 0 : 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

const NavSideBar = styled(Sider)(() => ({
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid #f2f2f2",
  ".logo": {
    padding: "60px 0 30px",
    h1: {
      textAlign: "center",
    },
  },
}));