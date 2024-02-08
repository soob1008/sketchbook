import { useState, MouseEvent } from "react";
import styled from "@emotion/styled";
import { Button, Flex } from "antd";
import { SmileOutlined, BugOutlined } from "@ant-design/icons";

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

interface MineBlock {
  isMine: boolean;
  isOpen: boolean;
  MineCount: number | null;
}

// 지뢰 좌표 생성함수
const getMinePosition = () => {
  // 랜덤으로 10개 좌표 생성해서
  const mineArr: number[][] = [];

  while (mineArr.length < MINE_COUNT) {
    const x = Math.floor(Math.random() * COL_LENGTH);
    const y = Math.floor(Math.random() * ROW_LENGTH);
    if (!mineArr.includes([x, y])) {
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
          mine: false,
          value: null,
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
            mine: true,
          };
        }
      }
    });
  });

  return initBoardArray;
};

const MineSweeperBoard = () => {
  const [board, setBoard] = useState(createMineBoard());
  console.log(board);

  const onClickBlock = (event: MouseEvent, x: number, y: number) => {
    // 왼쪽 마우스 눌렀을 때
    if (event.button === 0) {
      // 누른 곳이 지뢰면, -> isMine 1, mineCount 0, isOpen 1 - explodedMine
      // 누른 곳이 지뢰가 아니면, 주변에 지뢰가 있는지 검사한다. openBlock();
    }
  };
  function getBombCount(x: number, y: number): number {
    // TODO: implementation
    return 0;
  }

  const setBombCountToBoard = (x: number, y: number, bombCount: number) => {
    // TODO: implementation
  };

  const openBlock = (x: number, y: number) => {
    // x, y 값이 0 보다 작거나 maxLength 보다 크면 종료.
    // if(isOpen) return;

    // 1. 주변의 지뢰 개수를 구한다.
    const bombCount = getBombCount(x, y);

    // 주변에 지뢰가 있는 경우,
    if (bombCount > 0) {
      setBombCountToBoard(x, y, bombCount);
      // isMine false, mineCount > 0, isOpen true -> visible,  MineCount 에 넣어준다.
      return;
    }

    // 지뢰가 없는 경우, 주변에 지뢰가 있는지 검사한다.
    if (bombCount === 0) {
      // isMine false , isOpen true, bombCount === 0 -> visible, MineCount 0

      openBlock(x - 1, y - 1);
      openBlock(x - 1, y - 1);
      openBlock(x, y - 1);
      openBlock(x - 1, y);
      openBlock(x + 1, y);
      openBlock(x - 1, y + 1);
      openBlock(x, y + 1);
      openBlock(x + 1, y + 1);
    }

    // 있으면, 지뢰 개수  넣어주고 종료
    // 없으면, x, y-1 주변에 지뢰가 있는 지 검사
  };

  return (
    <>
      <MineSweeperInfo justify="space-evenly" align="center">
        <span className="count">10</span>
        <Button>
          <SmileOutlined />
          {/*<FrownOutlined />*/}
          {/*<SunOutlined />*/}
        </Button>
        <span className="time">10:00</span>
      </MineSweeperInfo>
      {board.map((row, rowIndex) => (
        <Row key={`mine-row-${rowIndex}`}>
          {row.map((cell, cellIndex) => (
            <Cell
              key={`block-${cellIndex}`}
              type={cell.type as MineType}
              value={cell.value}
              // onClick={(e) => onClickBlock(e, cell as MineBlock)}
            >
              {(cell.type === "mine" || cell.type === "explodedMine") && (
                <BugOutlined />
              )}
            </Cell>
          ))}
        </Row>
      ))}
    </>
  );
};

export default MineSweeperBoard;

const MineSweeperInfo = styled(Flex)`
  margin-bottom: 20px;
`;

const Row = styled("div")(() => ({
  display: "flex",
}));

const getBlockColor = (type: MineType) => {
  switch (type) {
    case "inVisible":
      return "#260059";
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

const Cell = styled("span")<{ type: MineType; value?: number | null }>(
  ({ type, value }) => ({
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