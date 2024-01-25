import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BlockType, BLOCKS, Position } from "./util";

interface BlockStatus {
  position: Position;
  blockType: BlockType;
  blockIndex: number;
}

const initArray = Array.from({ length: 20 }, () => Array(10).fill(null));

const initBlock = (): BlockStatus => {
  const keys = Object.keys(BLOCKS);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];

  return {
    position: {
      x: 3,
      y: 0,
    },
    blockType: randomKey as BlockType,
    blockIndex: 0,
  };
};

const Board = () => {
  const [board, setBoard] = useState<BlockType[][]>(initArray);
  const [block, setBlock] = useState<BlockStatus>(initBlock());

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  // 4x4 중에 null 이 아닌 cell의 좌표를 리턴하는 함수 [y, x]
  const getBlockPositions = (
    blockKey: BlockType,
    statusIndex: number,
  ): Position[] => {
    const status: number[][] = BLOCKS[`${blockKey}`].status[statusIndex];
    let positions = Array<Position>();
    status.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell !== 0) {
          positions.push({
            x: cellIndex,
            y: rowIndex,
          });
        }
      });
    });

    return positions;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const { position, blockType, blockIndex } = block;
    const { x, y } = position;

    if (e.key === "ArrowUp") {
      const nextStatusIndex =
        (block.blockIndex + 1) % BLOCKS[`${block.blockType}`].status.length;

      if (checkCells(x, y, getBlockPositions(blockType, nextStatusIndex))) {
        setBlock((prevBlock) => ({
          ...prevBlock,
          blockIndex: nextStatusIndex,
        }));
      }
    } else if (e.key === "ArrowLeft") {
      if (checkCells(x - 1, y, getBlockPositions(blockType, blockIndex))) {
        moveBlock(x - 1, y);
      }
    } else if (e.key === "ArrowRight") {
      if (checkCells(x + 1, y, getBlockPositions(blockType, blockIndex))) {
        moveBlock(x + 1, y);
      }
    } else if (e.key === "ArrowDown") {
      if (checkCells(x, y + 1, getBlockPositions(blockType, blockIndex))) {
        moveBlock(x, y + 1);
      } else {
        // 보드에 블럭 값 반영하고 + 블럭 재생성
        fixToBoard(x, y, blockType, getBlockPositions(blockType, blockIndex));
        setBlock(initBlock());
      }
    }
  };

  const fixToBoard = (
    x: number,
    y: number,
    type: BlockType,
    positions: Position[],
  ) => {
    const newBoard = board.map((row) => [...row]);

    for (let position of positions) {
      const { x: posX, y: posY } = position;
      newBoard[y + posY][x + posX] = type;
    }
    setBoard(newBoard);
  };

  const moveBlock = (x: number, y: number) => {
    setBlock((prevBlock) => ({
      ...prevBlock,
      position: { x, y },
    }));
  };

  // 블럭 cell 체크 - 블럭 이동 가능 여부 검사
  const checkCells = (
    blockX: number,
    blockY: number,
    positions: Position[],
  ) => {
    for (let position of positions) {
      const { x: posX, y: posY } = position;

      // 벽막기
      if (blockX + posX < 0 || blockX + posX >= 10) {
        return false;
      }

      if (blockY + posY < 0 || blockY + posY >= 20) {
        return false;
      }

      // 보드에 블럭이 있을 경우 막기
      if (board[blockY + posY][blockX + posX]) {
        return false;
      }
    }
    return true;
  };

  return (
    <BoardWrapper>
      <div className="inner">
        {board?.map((row, rowIndex) => (
          <Row key={`board-row-${rowIndex}`}>
            {row.map((boardCell, colIndex) => {
              const positions = getBlockPositions(
                block.blockType,
                block.blockIndex,
              ).map((it) => ({
                x: it.x + block.position.x,
                y: it.y + block.position.y,
              }));

              const isBlock = positions.find(
                (it) => it.y === rowIndex && it.x === colIndex,
              );
              const boardValue = isBlock
                ? block.blockType
                : board[rowIndex][colIndex];

              return (
                <Cell key={`board-cell-${colIndex}`} blockType={boardValue}>
                  {boardValue}
                  {isBlock ? "b" : "x"}
                </Cell>
              );
            })}
          </Row>
        ))}
      </div>
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
  width: "350px",
  ".inner": {
    width: "380px",
  },
});

const Row = styled.div(() => ({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Cell = styled.div<{ blockType: BlockType }>(({ blockType }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "35px",
  height: "35px",
  backgroundColor: blockType ? BLOCKS[`${blockType}`].color : "white",
  fontSize: "12px",
}));