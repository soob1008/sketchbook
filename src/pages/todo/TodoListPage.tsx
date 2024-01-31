import ListTable from "../../components/ui/table/ListTable";

const TodoListPage = () => {
  return (
    <ListTable
      data={[
        {
          key: "todo_redux",
          title: "리덕스 툴킷을 이용한 투두 리스트",
          link: "/todo/redux",
          skill: ["redux tookit"],
          date: "2024-01-31",
        },
        {
          key: "todo_redux",
          title: "리덕스 툴킷을 이용한 투두 리스트",
          link: "/todo/redux",
          skill: ["redux tookit"],
          date: "2024-01-31",
        },
        {
          key: "todo_redux",
          title: "리덕스 툴킷을 이용한 투두 리스트",
          link: "/todo/redux",
          skill: ["redux tookit"],
          date: "2024-01-31",
        },
        {
          key: "todo_redux",
          title: "리덕스 툴킷을 이용한 투두 리스트",
          link: "/todo/redux",
          skill: ["redux tookit"],
          date: "2024-01-31",
        },
        {
          key: "todo_redux",
          title: "리덕스 툴킷을 이용한 투두 리스트",
          link: "/todo/redux",
          skill: ["redux tookit"],
          date: "2024-01-31",
        },
      ]}
    />
  );
};

export default TodoListPage;