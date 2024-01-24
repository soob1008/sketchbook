import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Block, BLOCKS, BoardIndex, Position, tetrisData } from "./util";

interface BlockStatus {
  position: Position;
  category: Block;
  blockIndex: number;
}

const Board = () => {
  const [board, setBoard] = useState(tetrisData);

  const [block, setBlock] = useState<BlockStatus>({
    position: {
      x: 3,
      y: 0,
    },
    category: "I",
    blockIndex: 0,
  });

  useEffect(() => {
    const randomKey = randomBlock();

    setBlock({
      ...block,
      category: randomKey as Block,
    });
  }, []);

  useEffect(() => {
    if (!block) return;

    renderBoard(
      [6, 2],
      [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    );
    renderBlock(block);

    window.addEventListener("keydown", handleKeyDown);
    // 언마운트되었을 때 이벤트 제거
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [block]);

  const renderBoard = (position: number[], value: number[][]) => {
    console.log("보드 렌더링", board, position, value);

    console.log("newArray");
  };

  const renderBlock = (block: BlockStatus) => {
    const { position, category, blockIndex } = block;
    const { x, y } = position;

    const currentBlock = BLOCKS[`${category}`].status[`${blockIndex}`];

    const cells = board.map((row: number[], index) => {
      if (
        index >= y &&
        index <= y + 3 &&
        typeof currentBlock[index] === "object"
      ) {
        // console.log("render", position, row, "cell", currentBlock);
        // row.splice(
        //   x,
        //   currentBlock.length,
        //   ...(currentBlock[index] as number[]),
        // );
      }
      return row;
    });

    setBoard(cells);
  };

  const randomBlock = () => {
    const keys = Object.keys(BLOCKS);

    return keys[Math.floor(Math.random() * keys.length)];
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!block) return;
    const { position } = block;
    const { x, y } = position;

    // k.key = ArrowLeft | ArrowRight | ArrowUp | ArrowDown
    if (e.key === "ArrowUp") {
      // 회전
      const statusLength = BLOCKS[`${block.category}`].status.length;
      let index = block.blockIndex + 1;

      if (index >= statusLength) {
        index = 0;
      }

      setBlock({
        ...block,
        blockIndex: index,
      });
    } else if (e.key === "ArrowLeft") {
      // 왼쪽 이동
    } else if (e.key === "ArrowRight") {
      // 오른쪽 이동

      if (checkCellValue({ key: e.key, position })) {
      } else {
        console.log("오른쪽 이동 안함");
      }
    } else if (e.key === "ArrowDown") {
    }
  };

  // 마지막 cell 검사하는 함수
  const checkCellValue = ({
    key,
    position,
  }: {
    key: string;
    position: Position;
  }) => {
    const { x, y } = position;
    const currentBlock = getPositionBlock(x, y);

    if (key === "ArrowRight") {
      const compareBlock = getPositionBlock(x + 3, y);
      // 맨 마지막 블록 값
      const lastCurrentBlock = changeRowCell(currentBlock)[3];
      const firstCompareBlock = changeRowCell(compareBlock)[0];
      // console.log("현재 마지막 cell 값", currentBlock);
      // console.log("다음 블럭의 첫번쨰 cell 값", compareBlock);
      // 두개의 값 비교
      lastCurrentBlock.forEach((current) => {
        firstCompareBlock.forEach((next) => {
          if (current !== 0 && next !== 0) {
            return false;
          }
        });
      });

      return true;
    }
  };

  // 비교 해야할 인덱스 값 추출
  const getMaxMinIndex = (x: number, y: number) => {
    const currentBlock = getPositionBlock(x, y);
    let cells: number[] = [];
    let maxCellIndex: BoardIndex = { rowIndex: -1, cellIndex: -1 };
    let minCellIndex: BoardIndex = { rowIndex: -1, cellIndex: -1 };

    currentBlock.map((row, rowIndex) => {
      let cellsIndex: number[] = [];

      row.forEach((cell, cellIndex) => {
        if (cell) {
          cellsIndex.push(cellIndex);
          if (cellIndex > maxCellIndex.cellIndex) {
            maxCellIndex = { rowIndex, cellIndex };
          }

          if (
            minCellIndex.cellIndex === -1 ||
            cellIndex < minCellIndex.cellIndex
          ) {
            minCellIndex = { rowIndex, cellIndex };
          }
        }
      });

      if (cellsIndex.length > 0) {
        cells.push(...cellsIndex);
      }
    });

    const maxXIndex = maxCellIndex.cellIndex;
    const maxYIndex = maxCellIndex.rowIndex;
    const minXIndex = minCellIndex.cellIndex;
    const minYIndex = minCellIndex.rowIndex;

    return {
      rightIndex: {
        x: maxXIndex,
        y: maxYIndex,
      },
      leftIndex: {
        x: minXIndex,
        y: minYIndex,
      },
    };
  };

  // x,y 좌표 입력하면 4x4 값 추출
  const getPositionBlock = (x: number, y: number) => {
    let blockRow = [] as number[][];
    board.forEach((row, rowIndex) => {
      if (y <= rowIndex && y + 3 >= rowIndex) {
        let blockCell = [] as number[];

        row.forEach((cell, cellIndex) => {
          if (x <= cellIndex && x + 3 >= cellIndex) {
            blockCell.push(cell);
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
  return (
    <BoardWrapper>
      <div className="inner">
        {board?.map((row, rowIndex) => (
          <Row key={`board-row-${rowIndex}`}>
            {row.map((boardCell, colIndex) => {
              // const blockCells = getBlockPositions();
              // const cell = blockCells.find(
              //   (it) => it.x === colIndex && it.y === rowIndex,
              // )
              //   ? block.category
              //   : board[colIndex][rowIndex];
              return (
                <Cell key={`board-cell-${colIndex}`} number={boardCell}>
                  {/*{cell}*/}
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