import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Button, Card, Divider, Flex, Space } from "antd";
import { Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TodoList from "./TodoList";
import { useSelector, useDispatch } from "react-redux";
import { insert, TodoData, Todos } from "./todoSlice";
import dayjs from "dayjs";

const { Meta } = Card;

const Todo = () => {
  const [text, setText] = useState("");
  const todos = useSelector(Todos);
  const dispatch = useDispatch();
  const [time, setTime] = useState(dayjs().format("HH:mm:ss"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(dayjs().format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onAdd = () => {
    if (text.trim() === "") {
      return alert("todo를 작성해주세요.");
    }

    dispatch(insert(text));
    setText("");
  };

  const onAddKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <Card bordered={false} style={{ width: 600 }}>
      <Meta title={dayjs().format("YYYY-MM-DD")} description={time} />
      <Divider />
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