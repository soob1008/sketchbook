import { useState, MouseEvent, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Button, Flex, Typography } from "antd";
import {
  SmileOutlined,
  BugOutlined,
  FlagOutlined,
  FrownOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import useInterval from "@hooks/useInterval";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

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

type GameStatus = "FAIL" | "CONTINUE" | "SUCCESS";

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
const createMineBoard = (): MineBlock[][] => {
  const initBoardArray: MineBlock[][] = Array.from(
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
  const [board, setBoard] = useState<MineBlock[][]>(createMineBoard());
  const [remainFlag, setRemainFlag] = useState(MINE_COUNT);
  const [gameStatus, setGameStatus] = useState<GameStatus>("CONTINUE");
  const [time, setTime] = useState(0);

  const setMineBlockToBoard = (
    newBoard: MineBlock[][],
    x: number,
    y: number,
    block: MineBlock,
  ) => {
    newBoard[y][x] = block;
  };

  const checkGameOver = (board: MineBlock[][]) => {
    let closeCount = 0;
    for (let row of board) {
      for (let cell of row) {
        if (cell.isMine && cell.isOpen) {
          return "FAIL";
        }

        if (!cell.isMine && !cell.isOpen) {
          closeCount += 1;
        }
      }
    }

    if (closeCount > 0) {
      return "CONTINUE";
    }

    return "SUCCESS";
  };

  useInterval(
    () => {
      setTime(time + 1);
    },
    gameStatus === "FAIL" || gameStatus === "SUCCESS" ? null : 1000,
  );

  const onClickBlock = (event: MouseEvent, x: number, y: number) => {
    event.preventDefault();
    if (gameStatus === "FAIL") return;
    if (board[y][x].isOpen) return;
    const newBoard = board.map((row) => [...row]);

    // 왼쪽 마우스 눌렀을 때
    if (event.button === 0) {
      // 누른 곳이 지뢰면, -> isMine 1, mineCount 0, isOpen 1 - explodedMine
      if (newBoard[y][x].isMine) {
        setMineBlockToBoard(newBoard, x, y, {
          ...newBoard[y][x],
          isOpen: true,
          type: "explodedMine",
        });
      } else {
        // 누른 곳이 지뢰가 아니면, 주변에 지뢰가 있는지 검사한다. 지뢰가 없으면 오픈 -  openBlock();
        openBlock(newBoard, x, y);
      }
    } else if (event.button === 2) {
      if (remainFlag > 0 && newBoard[y][x].type === "inVisible") {
        setMineBlockToBoard(newBoard, x, y, {
          ...newBoard[y][x],
          type: "flag",
        });

        setRemainFlag((prev) => prev - 1);
      } else if (newBoard[y][x].type === "flag") {
        setMineBlockToBoard(newBoard, x, y, {
          ...newBoard[y][x],
          type: "inVisible",
        });

        setRemainFlag((prev) => prev + 1);
      }
    }

    // 게임 성공, 실패, 게임중 처리
    const status = checkGameOver(newBoard);
    setGameStatus(status);

    setBoard(newBoard);
  };

  const onClickStart = () => {
    setBoard(createMineBoard());
    setRemainFlag(MINE_COUNT);
    setGameStatus("CONTINUE");
    setTime(0);
  };

  const getMineCount = (board: MineBlock[][], x: number, y: number) => {
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

  const openBlock = (board: MineBlock[][], x: number, y: number) => {
    // x, y 값이 0 보다 작거나 maxLength 보다 크면 종료.
    if (
      x < 0 ||
      y < 0 ||
      x >= COL_LENGTH ||
      y >= ROW_LENGTH ||
      board[y][x].isOpen ||
      board[y][x].type === "flag"
    )
      return false;

    // 1. 주변의 지뢰 개수를 구한다.// 주변에 지뢰가 있는 경우,
    const mineCount = getMineCount(board, x, y);

    setMineBlockToBoard(board, x, y, {
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
          openBlock(board, x + posX, y + posY);
        }
      }
    }
  };

  return (
    <MineSweeperWrapper>
      <Title level={3}>Minesweeper</Title>
      <MineSweeperInfo justify="space-evenly" align="center">
        <span className="count">{remainFlag}</span>
        <MineButton
          onClick={onClickStart}
          style={{ height: "40px", fontSize: "20px" }}
          gameStatus={gameStatus}
        >
          {gameStatus === "FAIL" && <FrownOutlined />}
          {gameStatus === "CONTINUE" && <SmileOutlined />}
          {gameStatus === "SUCCESS" && <LikeOutlined />}
        </MineButton>
        <span className="time">
          {dayjs.duration(time, "seconds").format("HH:mm:ss")}
        </span>
      </MineSweeperInfo>
      {board.map((row, rowIndex) => (
        <Row key={`mine-row-${rowIndex}`}>
          {row.map((cell, cellIndex) => {
            const { type, mineCount } = cell;

            return (
              <Cell
                key={`block-${cellIndex}`}
                blockType={cell.type as MineType}
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

const getMineButtonColor = (status: GameStatus) => {
  switch (status) {
    case "FAIL":
      return {
        backgroundColor: "#eeff1f",
      };
    case "CONTINUE":
      return {
        backgroundColor: "#ffffff",
      };
    case "SUCCESS":
      return {
        backgroundColor: "#0072ff",
        color: "#ffffff",
      };
  }
};

const Cell = styled("button")<{
  blockType: MineType;
  mineCount?: number | null;
}>(({ blockType, mineCount }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "35px",
  height: "35px",
  backgroundColor: getBlockColor(blockType),
  margin: "1px",
  borderRadius: "3px",
  outline: "none",
  border: "none",
}));

const MineButton = styled(Button)<{ gameStatus: GameStatus }>(
  ({ gameStatus }) => ({
    ...getMineButtonColor(gameStatus),
  }),
);