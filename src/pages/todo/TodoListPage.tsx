import ListTable from "../../components/ui/table/ListTable";

const TodoListPage = () => {
  return (
    <ListTable
      data={[
        {
          key: "todo_zustand",
          title: "zustand를 이용한 todo",
          link: "/todo/zustand",
          skill: ["zustand"],
          date: "2024-02-05",
        },
        {
          key: "todo_redux",
          title: "리덕스 툴킷을 이용한 todo",
          link: "/todo/redux",
          skill: ["redux toolkit"],
          date: "2024-01-20",
        },
      ]}
    />
  );
};

export default TodoListPage;