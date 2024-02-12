import ListTable from "../../components/ui/table/ListTable";

const mineSweeperList = [
  {
    key: "minesweeper1",
    title: "지뢰찾기 초급",
    skill: ["react"],
    link: "/minesweeper/1",
    date: "2024-02-12",
  },
];

const MineSweeperListPage = () => {
  return <ListTable data={mineSweeperList} />;
};

export default MineSweeperListPage;