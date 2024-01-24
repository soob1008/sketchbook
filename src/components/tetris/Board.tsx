import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Block, BLOCKS, BoardIndex, Position, tetrisData } from "./util";

interface BlockStatus {
  position: Position;
  type: Block;
  blockIndex: number;
}

const Board = () => {
  const [board, setBoard] = useState(tetrisData);
  const [block, setBlock] = useState<BlockStatus>({
    position: {
      x: 3,
      y: 0,
    },
    type: "I",
    blockIndex: 0,
  });
  const [currentBlockCells, setCurrentBlockCells] = useState<number[][]>([]);

  useEffect(() => {
    const randomKey = randomBlock();

    setBlock({
      ...block,
      type: randomKey as Block,
    });
  }, []);

  useEffect(() => {
    if (!block) return;

    // 현재 블럭의 좌표 값
    const cellPosition = getBlockPositions(block);
    setCurrentBlockCells(cellPosition);

    window.addEventListener("keydown", handleKeyDown);
    // 언마운트되었을 때 이벤트 제거
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [block]);

  console.log("현재 블럭의 좌표 값", currentBlockCells);
  const randomBlock = () => {
    const keys = Object.keys(BLOCKS);

    return keys[Math.floor(Math.random() * keys.length)];
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!block) return;
    const { position, type, blockIndex } = block;
    const { x, y } = position;
    const blockType = {
      type,
      blockIndex,
    };

    if (e.key === "ArrowUp") {
      // 회전
      const statusLength = BLOCKS[`${block.type}`].status.length;
      let index = block.blockIndex + 1;

      if (index >= statusLength) {
        index = 0;
      }

      if (
        checkCells(x, y, {
          type: type,
          blockIndex: index,
        })
      ) {
        setBlock({
          ...block,
          blockIndex: index,
        });
      }
    } else if (e.key === "ArrowLeft") {
      if (checkCells(x - 1, y, blockType)) {
        moveBlock(x - 1, y);
      }
    } else if (e.key === "ArrowRight") {
      if (checkCells(x + 1, y, blockType)) {
        moveBlock(x + 1, y);
      }
    } else if (e.key === "ArrowDown") {
      // 아래로 내릴 때
      if (checkCells(x, y + 1, blockType)) {
        moveBlock(x, y + 1);
      } else {
        // 보드에 블럭 값 반영하고 + 블럭 재생성
      }
    }
  };

  const moveBlock = (x: number, y: number) => {
    setBlock({
      ...block,
      position: { x, y },
    });
  };

  // 블럭 cell 체크 하는 함수
  const checkCells = (
    x: number,
    y: number,
    blockType: {
      type: Block;
      blockIndex: number;
    },
  ) => {
    const checkBlock = {
      position: { x, y },
      type: blockType.type,
      blockIndex: blockType.blockIndex,
    };

    const nextBlockPositions: number[][] = getBlockPositions(checkBlock);

    for (let pos of nextBlockPositions) {
      const posX = pos[1];
      const posY = pos[0];

      // 벽막기
      if (posX < 0 || posX > 9) {
        return false;
      }

      if (posY < 0 || posY > 19) {
        return false;
      }

      if (board[posY][posX] !== 0) {
        return false;
      }
    }

    return true;
  };

  // 4x4 중에 0이 아닌 cell의 좌표를 리턴하는 함수 [y, x]
  const getBlockPositions = (block: BlockStatus) => {
    const { type, blockIndex } = block;
    const { x, y } = block.position;
    const currentBlock = BLOCKS[`${type}`].status[`${blockIndex}`];

    let existBlocks: number[][] = [];

    currentBlock.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell !== 0) {
          existBlocks.push([rowIndex + y, cellIndex + x]);
        }
      });
    });

    return existBlocks;
  };

  //좌표값을 넣으면 현재 블록의 존재하는 상대좌표 값을 리턴

  // x,y 좌표 입력하면 4x4 값 추출
  const getBlocks = (x: number, y: number) => {
    let blockRow = [] as number[][];
    board.forEach((row, rowIndex) => {
      if (y <= rowIndex && y + 3 >= rowIndex) {
        let blockCell = [] as number[];

        row.forEach((cell, cellIndex) => {
          if (x <= cellIndex && x + 3 >= cellIndex) {
            blockCell.push(board[y + rowIndex][x + cellIndex]);
          }
        });

        blockRow.push(blockCell);
      }
    });

    return blockRow;
  };

  const changeRowCell = (block: number[][]) => {
    let blockArr: number[][] = [];
    block.forEach((row, rowIndex) => {
      const rowArr = row.map((cell, cellIndex) => {
        return block[cellIndex][rowIndex];
      });

      blockArr.push(rowArr);
    });

    return blockArr;
  };

  const getBlockValue = (type: Block) => {
    switch (type) {
      case "I":
        return 1;
      case "L":
        return 2;
      case "J":
        return 3;
      case "T":
        return 4;
      case "O":
        return 5;
      case "S":
        return 6;
      case "Z":
        return 7;
      default:
        return 0;
    }
  };

  return (
    <BoardWrapper>
      <div className="inner">
        {board?.map((row, rowIndex) => (
          <Row key={`board-row-${rowIndex}`}>
            {row.map((boardCell, colIndex) => {
              // const cell = blockCells.find(
              //   (it) => it.x === colIndex && it.y === rowIndex,
              // )
              //   ? block.category
              //   : board[colIndex][rowIndex];

              const isBlock = currentBlockCells.find(
                (it) => it[0] === rowIndex && it[1] === colIndex,
              );
              const boardValue = isBlock
                ? getBlockValue(block.type)
                : board[rowIndex][colIndex];

              return (
                <Cell key={`board-cell-${colIndex}`} number={boardValue}>
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
  //overflow: "hidden",
  ".inner": {
    // position: "relative",
    // left: "-35px",
    width: "380px",
  },
});

const Row = styled.div(() => ({
  display: "inline-flex",
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
      return "transparent";
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