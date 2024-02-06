import ListTable from "../../components/ui/table/ListTable";

const mineSweeperList = [
  {
    key: "tetris1",
    title: "처음으로 만든 테트리스",
    skill: ["react"],
    link: "/tetris/1",
    date: "2024-01-20",
  },
];

const MineSweeperListPage = () => {
  return <ListTable data={mineSweeperList} />;
};

export default MineSweeperListPage;