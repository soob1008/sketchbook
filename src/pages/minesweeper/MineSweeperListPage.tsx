import ListTable from "../../components/ui/table/ListTable";

const mineSweeperList = [
  {
    key: "minesweeper1",
    title: "지뢰찾기 초급",
    skill: ["react"],
    link: "/minesweeper/1",
    date: "개발중",
  },
];

const MineSweeperListPage = () => {
  return <ListTable data={mineSweeperList} />;
};

export default MineSweeperListPage;