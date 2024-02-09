import { useState, MouseEvent } from "react";
import styled from "@emotion/styled";
import { Button, Flex, Typography } from "antd";
import {
  SmileOutlined,
  BugOutlined,
  FlagOutlined,
  FrownOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const ROW_LENGTH = 9;
const COL_LENGTH = 9;
const MINE_COUNT = 10;

type MineType =
  | "inVisible"
  | "visible"
  | "mine"
  | "explodedMine"
  | "flag"
  | "explodedFlag";

const AROUND_POSITIONS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

interface MineBlock {
  type: MineType;
  isMine: boolean;
  isOpen: boolean;
  mineCount: number;
}

// 지뢰 좌표 생성함수
const getMinePosition = () => {
  // 랜덤으로 10개 좌표 생성해서
  const mineArr: number[][] = [];

  while (mineArr.length < MINE_COUNT) {
    const x = Math.floor(Math.random() * COL_LENGTH);
    const y = Math.floor(Math.random() * ROW_LENGTH);

    const included = mineArr.some(
      (minePos) => JSON.stringify(minePos) === JSON.stringify([x, y]),
    );

    if (!included) {
      mineArr.push([x, y]);
    }
  }

  return mineArr;
};

// 지뢰 좌표를 보드 값에 넣어주고
const createMineBoard = () => {
  const initBoardArray = Array.from(
    { length: ROW_LENGTH },
    (_: MineBlock[], rowIndex) =>
      Array(COL_LENGTH)
        .fill({} as MineBlock)
        .map((_: MineBlock, colIndex) => ({
          type: "inVisible",
          isOpen: false,
          isMine: false,
          mineCount: 0,
        })),
  );

  const minePosition = getMinePosition();

  // 보드에 isMine true 넣어주기
  initBoardArray.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      for (let pos of minePosition) {
        const { [0]: x, [1]: y } = pos;

        if (x === cellIndex && y === rowIndex) {
          initBoardArray[rowIndex][cellIndex] = {
            ...initBoardArray[rowIndex][cellIndex],
            isMine: true,
          };
        }
      }
    });
  });

  return initBoardArray;
};

const MineSweeperBoard = () => {
  const [board, setBoard] = useState(createMineBoard());
  const newBoard = board.map((row) => [...row]);
  const [remainFlag, setRemainFlag] = useState(MINE_COUNT);
  const [isGameOver, setIsGameOver] = useState(false);
  const setMineBlockToBoard = (x: number, y: number, block: MineBlock) => {
    newBoard[y][x] = block;

    setBoard(newBoard);
  };
  const onClickBlock = (event: MouseEvent, x: number, y: number) => {
    event.preventDefault();

    // 왼쪽 마우스 눌렀을 때
    if (event.button === 0) {
      // 누른 곳이 지뢰면, -> isMine 1, mineCount 0, isOpen 1 - explodedMine
      if (board[y][x].isMine) {
        console.log("x, y", x, y);

        setMineBlockToBoard(x, y, {
          ...board[y][x],
          type: "explodedMine",
        });

        // 게임 오버
        setIsGameOver(true);
      } else {
        // 누른 곳이 지뢰가 아니면, 주변에 지뢰가 있는지 검사한다. 지뢰가 없으면 오픈 -  openBlock();
        openBlock(x, y);
      }
    }

    // 오른쪽 마우스를 눌렀을 때 깃발을 놓는다.
    if (event.button === 2) {
      if (remainFlag > 0 && board[y][x].type === "inVisible") {
        setMineBlockToBoard(x, y, {
          ...board[y][x],
          type: "flag",
        });
        setRemainFlag((prev) => prev - 1);
      }

      if (board[y][x].type === "flag") {
        setMineBlockToBoard(x, y, {
          ...board[y][x],
          type: "inVisible",
        });

        setRemainFlag((prev) => prev + 1);
      }
    }
  };

  const getMineCount = (x: number, y: number) => {
    let count = 0;

    for (let pos of AROUND_POSITIONS) {
      const [posX, posY] = pos;

      if (
        x + posX >= 0 &&
        y + posY >= 0 &&
        y + posY < ROW_LENGTH &&
        x + posX < COL_LENGTH
      ) {
        if (board[y + posY][x + posX].isMine) count++;
      }
    }

    return count;
  };

  const openBlock = (x: number, y: number) => {
    // x, y 값이 0 보다 작거나 maxLength 보다 크면 종료.
    if (
      x < 0 ||
      y < 0 ||
      x >= COL_LENGTH ||
      y >= ROW_LENGTH ||
      newBoard[y][x].isOpen
    )
      return false;

    // 1. 주변의 지뢰 개수를 구한다.// 주변에 지뢰가 있는 경우,
    const mineCount = getMineCount(x, y);

    setMineBlockToBoard(x, y, {
      type: "visible",
      isOpen: true,
      isMine: false,
      mineCount,
    });

    // 주변에 지뢰가 없으면 주변 블록 열기
    if (mineCount === 0) {
      for (let pos of AROUND_POSITIONS) {
        const [posX, posY] = pos;

        if (x + posX >= 0 && y + posY >= 0) {
          openBlock(x + posX, y + posY);
        }
      }
    }
  };

  return (
    <MineSweeperWrapper>
      <Title level={3}>Minesweeper</Title>
      <MineSweeperInfo justify="space-evenly" align="center">
        <span className="count">{remainFlag}</span>
        <Button>
          {isGameOver ? <FrownOutlined /> : <SmileOutlined />}

          {/*<FrownOutlined />*/}
          {/*<SunOutlined />*/}
        </Button>
        <span className="time">10:00</span>
      </MineSweeperInfo>
      {board.map((row, rowIndex) => (
        <Row key={`mine-row-${rowIndex}`}>
          {row.map((cell, cellIndex) => {
            const { type, mineCount } = cell;

            return (
              <Cell
                key={`block-${cellIndex}`}
                type={cell.type as MineType}
                mineCount={mineCount}
                onClick={(e) => onClickBlock(e, cellIndex, rowIndex)}
                onContextMenu={(e) => onClickBlock(e, cellIndex, rowIndex)}
              >
                {mineCount > 0 && mineCount}
                {(type === "mine" || type === "explodedMine") && (
                  <BugOutlined />
                )}
                {(type === "flag" || type === "explodedFlag") && (
                  <FlagOutlined />
                )}
              </Cell>
            );
          })}
        </Row>
      ))}
    </MineSweeperWrapper>
  );
};

export default MineSweeperBoard;

const MineSweeperWrapper = styled("div")`
  overflow: hidden;
  position: relative;
  display: inline-block;
  padding: 20px;
  border-radius: 10px;
  background-color: #c2d5ff;
`;

const MineSweeperInfo = styled(Flex)`
  margin-bottom: 20px;
`;

const Row = styled("div")(() => ({
  display: "flex",
}));

const getBlockColor = (type: MineType) => {
  switch (type) {
    case "inVisible":
      return "#031349";
    case "visible":
    case "mine":
      return "#e2e2e2";
    case "explodedMine":
    case "explodedFlag":
      return "red";
    case "flag":
      return "orange";
  }
};

const Cell = styled("span")<{ type: MineType; mineCount?: number | null }>(
  ({ type, mineCount }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "35px",
    height: "35px",
    backgroundColor: getBlockColor(type),
    margin: "1px",
    cursor: "pointer",
    borderRadius: "3px",
  }),
);