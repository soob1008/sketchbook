import { useState } from "react";
import styled from "@emotion/styled";
import { Button, Col, Flex } from "antd";
import { SmileOutlined, BugOutlined } from "@ant-design/icons";

// 지뢰 좌표 생성함수
const getMinePosition = () => {
  // 랜덤으로 10개 좌표 생성해서
  let mineArr: number[][] = [];

  for (let i = 0; i <= 9; i++) {
    const x = Math.floor(Math.random() * 9);
    const y = Math.floor(Math.random() * 9);

    if (mineArr.includes([x, y])) {
      i--;
    } else {
      mineArr.push([x, y]);
    }
  }

  return mineArr;
};

// 지뢰 좌표를 보드 값에 넣어주고
const createMineBoard = () => {
  const initBoardArray = Array.from({ length: 9 }, () =>
    Array(9).fill({
      visible: true,
      value: 0,
    }),
  );

  const minePosition = getMinePosition();

  initBoardArray.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      for (let pos of minePosition) {
        const { [0]: x, [1]: y } = pos;

        if (x === cellIndex && y === rowIndex) {
          initBoardArray[rowIndex][cellIndex] = { visible: true, value: null };
        }
      }
    });
  });

  return initBoardArray;
};

const setMineValue = () => {};

const MineSweeperBoard = () => {
  const [board, setBoard] = useState(createMineBoard());

  return (
    <div style={{ width: "315px" }}>
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
          {row.map((cell, cellIndex) => {
            const isMine = cell.value === null;
            return cell.visible ? (
              <Cell>{isMine ? <BugOutlined /> : cell.value}</Cell>
            ) : (
              <CellButton />
            );
          })}
        </Row>
      ))}
    </div>
  );
};

export default MineSweeperBoard;

const MineSweeperInfo = styled(Flex)`
  margin-bottom: 20px;
`;

const Row = styled("div")(() => ({
  display: "flex",
}));

const CellButton = styled("button")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "35px",
  height: "35px",
  backgroundColor: "#e2e2e2",
  border: "4px outset #e2e2e2",
  outline: "none",
  borderRadius: 0,
  cursor: "pointer",
  "&:active": {
    border: "2px inset #d3d3d3",
    backgroundColor: "#d3d3d3",
  },
}));

const Cell = styled("span")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "35px",
  height: "35px",
  backgroundColor: "#e2e2e2",
  border: "1px solid #d3d3d3",
}));