import React, { ReactElement, useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  RocketOutlined,
  CodeOutlined,
  FileTextOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { Breadcrumb, Layout, Menu, MenuProps, theme } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Content, Sider } = Layout;

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
    getItem("chat", "chat"),
  ]),
  getItem("game", "game", <RocketOutlined />, [getItem("테트리스", "tetris")]),
  getItem("resume", "resume", <FileTextOutlined />),
  // getItem("Navigation Three", "sub4", <SettingOutlined />, [
  //   getItem("Option 9", "9"),
  //   getItem("Option 10", "10"),
  //   getItem("Option 11", "11"),
  //   getItem("Option 12", "12"),
  // ]),
];

const MainLayout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let currentPath = pathname.split("/").filter((path) => path !== "");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    console.log("location path name", currentPath);
  }, []);

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`);
  };

  return (
    <Layout style={{ overflow: "hidden", height: "100vh" }}>
      <Layout style={{ height: "100%", backgroundColor: "pink" }}>
        <CustomSideBar width={260}>
          <div className="logo">
            <h1>
              <Link to={"/"}>SketchBook</Link>
            </h1>
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["home"]}
            defaultOpenKeys={["laboratory"]}
            style={{ borderRight: 0 }}
            items={menuItems}
            onClick={onClick}
          />
        </CustomSideBar>
        <Layout style={{ padding: "0 24px 24px", overflowY: "scroll" }}>
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
              padding: 24,
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

const CustomSideBar = styled(Sider)`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #f2f2f2;
  .logo {
    padding: 60px 0 30px;
    h1 {
      text-align: center;
    }
  }
`;