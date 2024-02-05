import { Button, Card, Divider, Flex, Space } from "antd";
import { Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { TodoData, useTodoStore } from "./store";
import TodoList from "./TodoList";

const Todo = () => {
  const [text, setText] = useState("");
  const { todos, insert } = useTodoStore();

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onAdd = () => {
    if (text.trim() === "") {
      return alert("todo를 작성해주세요.");
    }

    insert({
      id: Date.now(),
      text,
      completed: false,
    });
    setText("");
  };

  const onAddKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <Card bordered={false} style={{ width: 600 }}>
      <Flex align={"center"}>
        <Input
          placeholder="input search text"
          onChange={onChangeText}
          onKeyPress={onAddKeyPress}
          value={text}
          style={{
            borderRadius: "3px 0 0 3px",
            borderRight: "none",
          }}
        />
        <Button
          type="primary"
          size={"middle"}
          icon={<PlusOutlined />}
          onClick={onAdd}
          style={{
            borderRadius: "0 3px 3px 0",
          }}
        />
      </Flex>
      <Space
        direction="vertical"
        size="middle"
        style={{ width: "100%", marginTop: "20px" }}
      >
        {todos.map((todo: TodoData) => (
          <TodoList key={todo.id} todo={todo} />
        ))}
      </Space>
    </Card>
  );
};

export default Todo;