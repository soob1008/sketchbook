import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  Block,
  BLOCKS,
  tetrisData,
  tetrisElement,
  TetrisElementType,
} from "./util";

interface BlockStatus {
  position: number[];
  category: Block;
  blockIndex: number;
}

const Board = () => {
  // const initRow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // const [tetrisRow, setTetrisRow] = useState<Array<number[]>>();
  // 좌표값, 블록종류, 블럭상태(index)
  const [tetrisBoard, setTetrisBoard] = useState(tetrisData);
  const [block, setBlock] = useState<BlockStatus>();

  useEffect(() => {
    // 블럭 초기값

    const randomKey = randomBlock();

    setBlock({
      position: [3, 0],
      category: randomKey as Block,
      blockIndex: 0,
    });
  }, []);

  useEffect(() => {
    if (!block) return;

    renderBlock(block);
  }, [block]);

  // 블록 렌더링
  const renderBlock = (block: BlockStatus) => {
    const { position, category, blockIndex } = block;
    const x = position[0];
    const y = position[1];

    const currentBlock = BLOCKS[`${category}`].status[`${blockIndex}`];

    const tetris = tetrisBoard.map((row: number[], index) => {
      if (
        index >= y &&
        index <= y + 3 &&
        typeof currentBlock[index] === "object"
      ) {
        row.splice(x, 4, ...(currentBlock[index] as number[]));
      }
      return row;
    });

    setTetrisBoard(tetris);
  };

  const randomBlock = () => {
    const keys = Object.keys(BLOCKS);

    return keys[Math.floor(Math.random() * keys.length)];
  };

  // keyboard event
  const handleKeyBoard = () => {};

  return (
    <BoardWrapper>
      {tetrisBoard?.map((row, index) => (
        <Row key={`tetris-row-${index}`}>
          {row.map((cell, i) => (
            <Cell key={`tetris-cell-${i}`} number={cell}>
              {cell}
            </Cell>
          ))}
        </Row>
      ))}
    </BoardWrapper>
  );
};

export default Board;

const BoardWrapper = styled.div(() => ({}), {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "1px solid #000",
});

const Row = styled.div(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const getBackgroundColor = (number: number) => {
  switch (number) {
    case 1:
      return "#ff5858";
    case 2:
      return "#3f5aed";
    case 3:
      return "orange";
    case 4:
      return "#bc12cc";
    case 5:
      return "yellow";
    case 6:
      return "skyblue";
    case 7:
      return "#15dd15";
    default:
      return "#939393";
  }
};
const Cell = styled.div<{ number: number }>(({ number }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "35px",
  height: "35px",
  backgroundColor: getBackgroundColor(number),
  fontSize: "12px",
}));