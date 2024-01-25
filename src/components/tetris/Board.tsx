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

  // 4x4 중에 null 이 아닌 cell 상대좌표를 리턴하는 함수
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
    const { x: boardX, y: boardY } = position;

    if (e.key === "ArrowUp") {
      const nextStatusIndex =
        (block.blockIndex + 1) % BLOCKS[`${block.blockType}`].status.length;

      if (
        checkCells(
          boardX,
          boardY,
          getBlockPositions(blockType, nextStatusIndex),
        )
      ) {
        setBlock((prevBlock) => ({
          ...prevBlock,
          blockIndex: nextStatusIndex,
        }));
      }
    } else if (e.key === "ArrowLeft") {
      if (
        checkCells(boardX - 1, boardY, getBlockPositions(blockType, blockIndex))
      ) {
        moveBlock(boardX - 1, boardY);
      }
    } else if (e.key === "ArrowRight") {
      if (
        checkCells(boardX + 1, boardY, getBlockPositions(blockType, blockIndex))
      ) {
        moveBlock(boardX + 1, boardY);
      }
    } else if (e.key === "ArrowDown") {
      if (
        checkCells(boardX, boardY + 1, getBlockPositions(blockType, blockIndex))
      ) {
        moveBlock(boardX, boardY + 1);
      } else {
        fixToBoard(
          boardX,
          boardY,
          blockType,
          getBlockPositions(blockType, blockIndex),
        );
        removeBoardLine(
          boardX,
          boardY,
          blockType,
          getBlockPositions(blockType, blockIndex),
        );

        setBlock(initBlock());
      }
    } else if (e.code === "Space") {
      for (let i = 0; i < board.length - boardY; i++) {
        let movePosY = boardY + i;

        if (
          !checkCells(
            boardX,
            movePosY,
            getBlockPositions(blockType, blockIndex),
          )
        ) {
          // movePosY가 이동할 수 없으면 이전 위치까지만 이동 시킨다.
          moveBlock(boardX, movePosY - 1);
          removeBoardLine(
            boardX,
            movePosY - 1,
            blockType,
            getBlockPositions(blockType, blockIndex),
          );

          setBlock(initBlock());
          return false;
        }
      }
    }
  };

  // 라인 삭제하고 그 위에 있는 보드의 값을 아래에 반영해준다.
  const removeBoardLine = (
    boardX: number,
    boardY: number,
    blockType: BlockType,
    positions: Position[],
  ) => {
    //
    const newBoard = board.map((row) => [...row]);

    let currentBoardY: number[] = [];

    for (let position of positions) {
      const { x: blockX, y: blockY } = position;

      // board 에는 블럭의 값이 반영이 안되어있어서 현재 블럭 값 넣어줌. - fixToBoard 랑 겹치나?
      newBoard[boardY + blockY][boardX + blockX] = blockType;

      if (!currentBoardY.includes(boardY + blockY)) {
        currentBoardY.push(boardY + blockY);
      }
    }

    // 삭제 해야될 Y 값 추출
    const removeBoardY = currentBoardY.filter((posY) =>
      newBoard[posY].every((type) => type !== null),
    );

    const removeBoardLength = removeBoardY.length;

    if (removeBoardLength > 0) {
      const maxRemoveBoardY = Math.max(...removeBoardY);

      for (let posY = maxRemoveBoardY; posY >= 0; posY--) {
        newBoard[posY] = newBoard[posY - removeBoardLength];

        if (!newBoard[posY]) {
          newBoard[posY] = new Array(10).fill(null);
        }
      }
    }

    setBoard(newBoard);
  };

  const fixToBoard = (
    x: number,
    y: number,
    type: BlockType,
    positions: Position[],
  ) => {
    const newBoard = board.map((row) => [...row]);

    for (let position of positions) {
      const { x: blockX, y: blockY } = position;
      newBoard[y + blockY][x + blockX] = type;
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
    boardX: number,
    boardY: number,
    positions: Position[],
  ) => {
    for (let position of positions) {
      const { x: blockX, y: blockY } = position;

      // 벽막기 - boardX + blockX = x의 절대좌표
      if (boardX + blockX < 0 || boardX + blockX >= 10) {
        return false;
      }

      if (boardY + blockY < 0 || boardY + blockY >= 20) {
        return false;
      }

      // 보드에 블럭이 있을 경우 막기
      if (board[boardY + blockY][boardX + blockX]) {
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