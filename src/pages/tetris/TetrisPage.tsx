import Board from "../../components/tetris/board";
import Title from "../../components/ui/title";

const TetrisPage = () => {
  return (
    <>
      <Title title={"테트리스"} />

      {/*<p>리액트로 개발한 테트리스입니다.</p>*/}

      <Board />
    </>
  );
};

export default TetrisPage;