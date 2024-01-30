import React, { ReactElement, useState } from "react";
import styled from "@emotion/styled";
import {
  RocketOutlined,
  CodeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import { Breadcrumb, Layout, Menu, MenuProps, theme } from "antd";
import { useNavigate } from "react-router-dom";

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
    getItem("redux", "redux_todo"),
  ]),
  getItem("game", "game", <RocketOutlined />, [getItem("테트리스", "tetris1")]),
  getItem("resume", "resume", <FileTextOutlined />),
  // getItem("Navigation Three", "sub4", <SettingOutlined />, [
  //   getItem("Option 9", "9"),
  //   getItem("Option 10", "10"),
  //   getItem("Option 11", "11"),
  //   getItem("Option 12", "12"),
  // ]),
];

const MainLayout = ({ children }: LayoutProps) => {
  let navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };

  return (
    <Layout style={{ overflow: "hidden", height: "100vh" }}>
      <Layout style={{ height: "100%", backgroundColor: "pink" }}>
        <CustomSideBar width={260}>
          <div className="logo">
            <h1>SketchBook</h1>
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["home"]}
            defaultOpenKeys={["laboratory"]}
            style={{ height: "100%", borderRight: 0 }}
            items={menuItems}
            onClick={onClick}
          />
        </CustomSideBar>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
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