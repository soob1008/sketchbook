import React, { ChangeEvent, useState } from "react";
import { Button, Checkbox, Flex, Space, Typography, Input } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { EditOutlined, CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { remove, update, TodoData } from "./todoSlice";

type Todo = {
  todo: TodoData;
};

const { Text } = Typography;
const TodoList = ({ todo }: Todo) => {
  const { text, completed } = todo;
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const onComplete = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);

    dispatch(update({ ...todo, completed: e.target.checked }));
  };

  const onUpdate = () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      dispatch(
        update({
          id: todo.id,
          text: editText,
        }),
      );
    }
  };

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const onRemove = () => {
    dispatch(remove(todo.id));
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