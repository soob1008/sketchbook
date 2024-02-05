import React, { ChangeEvent, useState } from "react";
import { Button, Checkbox, Flex, Space, Typography, Input } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { EditOutlined, CheckOutlined, DeleteOutlined } from "@ant-design/icons";

import { TodoData, useTodoStore } from "./store";

type Todo = {
  todo: TodoData;
};

const { Text } = Typography;
const TodoList = ({ todo }: Todo) => {
  const { text, completed } = todo;
  const { remove, update } = useTodoStore();
  const [checked, setChecked] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const onComplete = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);

    update({ ...todo, completed: e.target.checked });
  };

  const onUpdate = () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      update({
        ...todo,
        text: editText,
      });
    }
  };

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const onRemove = () => {
    remove({
      ...todo,
      id: todo.id,
    });
  };

  return (
    <Flex flex={1} align={"center"} justify={"space-between"}>
      <Checkbox onChange={onComplete}>
        {isEditing ? (
          <Input defaultValue={text} onChange={onChangeText} />
        ) : (
          <Text delete={checked}>{text}</Text>
        )}
      </Checkbox>
      <Space>
        <Button
          icon={isEditing ? <CheckOutlined /> : <EditOutlined />}
          onClick={onUpdate}
        />
        <Button icon={<DeleteOutlined />} onClick={onRemove} />
      </Space>
    </Flex>
  );
};

export default TodoList;