import React from "react";

import { Divider, List, Typography, Checkbox, Anchor, Row, Col } from "antd";
import type { CheckboxProps } from "antd";
import styled from "@emotion/styled";

const { Title, Text } = Typography;

const todoList = [
  {
    title: "테트리스",
    href: "tetris",
    data: [
      {
        text: "기본 로직",
        isCompleted: true,
      },
      {
        text: "로직 정리",
        isCompleted: false,
      },
      {
        text: "초기화면 만들기",
        isCompleted: false,
      },
      {
        text: "점수 계산",
        isCompleted: false,
      },
      {
        text: "레벨 로직 추가",
        isCompleted: false,
      },
      {
        text: "다음 블럭 미리보기",
        isCompleted: false,
      },
    ],
  },
  {
    title: "지뢰찾기",
    href: "minesweeper",
    data: [
      {
        text: "기본 로직",
        isCompleted: false,
      },
    ],
  },
  {
    title: "투두리스트",
    href: "todoList",
    data: [
      {
        text: "redux toolkit 으로 구현",
        isCompleted: true,
      },
      {
        text: "mobx 으로 구현",
        isCompleted: false,
      },
      {
        text: "zustand 으로 구현",
        isCompleted: false,
      },
    ],
  },
  {
    title: "채팅 구현",
    href: "chat",
    data: [
      {
        text: "-",
        isCompleted: false,
      },
    ],
  },
];

const HomePage = () => {
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div style={{ paddingBottom: "100px" }}>
      {/*<Title level={2}>To-do list</Title>*/}
      <Row>
        <Col span={18}>
          {todoList.map((list, index) => (
            <div key={`todo-${index}`} id={list.href}>
              <List
                header={<Text strong>{list.title}</Text>}
                bordered
                dataSource={list.data}
                renderItem={(item) => (
                  <List.Item>
                    <Checkbox
                      onChange={onChange}
                      defaultChecked={item.isCompleted}
                      disabled={item.isCompleted}
                    >
                      <Text delete={item.isCompleted}>{item.text}</Text>
                    </Checkbox>
                  </List.Item>
                )}
              />
              {todoList.length - 1 !== index && <Divider />}
            </div>
          ))}
        </Col>
        <Col span={6}>
          <MainAnchor
            replace
            items={[
              {
                key: "tetris",
                href: "#tetris",
                title: "테트리스",
              },
              {
                key: "minesweeper",
                href: "#minesweeper",
                title: "지뢰찾기",
              },
              {
                key: "todoList",
                href: "#todoList",
                title: "투두리스트",
              },
              {
                key: "chat",
                href: "#chat",
                title: "채팅구현",
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;

const MainAnchor = styled(Anchor)`
  position: fixed;
  padding-left: 40px;
  background-color: "#fff;
`;