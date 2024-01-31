import ListTable from "../../components/ui/table/ListTable";

const tetrisList = [
  {
    key: "tetris1",
    title: "처음으로 만든 테트리스",
    skill: ["react"],
    link: "/tetris/1",
    date: "2024-01-20",
  },
];

const TetrisListPage = () => {
  return <ListTable data={tetrisList} />;
};

export default TetrisListPage;