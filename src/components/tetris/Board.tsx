import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BlockType, BLOCKS, Position, BlockStatus, createBlock } from "./util";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const initArray = Array.from({ length: 20 }, () => Array(10).fill(null));

const Board = () => {
  const [board, setBoard] = useState<BlockType[][]>(initArray);
  const [block, setBlock] = useState<BlockStatus>(createBlock());
  // 게임 진행 상태
  const [isPlaying, setPlaying] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const { position, blockType, blockIndex } = block;
    const { x: boardX, y: boardY } = position;

    const timer = setInterval(() => {
      // FIXME: 중복 로직 리팩토링
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
        initBlock(boardX, getBlockPositions(blockType, blockIndex));
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [block]);

  const playStart = () => {
    setBoard(initArray);

    setPlaying(true);
    setBlock(createBlock());
  };

  // 4x4 중에 null 이 아닌 cell 상대좌표를 리턴하는 함수
  const getBlockPositions = (
    blockKey: BlockType,
    statusIndex: number,
  ): Position[] => {
    const status: number[][] = BLOCKS[`${blockKey}`].state[statusIndex];
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
        (block.blockIndex + 1) % BLOCKS[`${block.blockType}`].state.length;

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
        initBlock(boardX, getBlockPositions(blockType, blockIndex));
      }
    } else if (e.code === "Space") {
      for (let i = 0; i < board.length - boardY; i++) {
        let movePosY = boardY + i;

        if (
          !checkCells(
            boardX,
            movePosY,
            getBlockPositions(blockType, blockIndex),
          ) &&
          movePosY > 0
        ) {
          // movePosY가 이동할 수 없으면 이전 위치까지만 이동 시킨다.
          moveBlock(boardX, movePosY - 1);
          removeBoardLine(
            boardX,
            movePosY - 1,
            blockType,
            getBlockPositions(blockType, blockIndex),
          );
          initBlock(boardX, getBlockPositions(blockType, blockIndex));
          return false;
        }
      }
    }
  };

  const initBlock = (boardX: number, positions: Position[]) => {
    const keys = Object.keys(BLOCKS);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    const createdBlock = {
      position: {
        x: 3,
        y: 0,
      },
      blockType: randomKey as BlockType,
      blockIndex: 0,
    };

    if (!checkCells(createdBlock.position.x, 0, positions)) {
      setPlaying(false);
    } else {
      setBlock(createdBlock);
      console.log("블럭 생성 --");
    }
  };

  // 라인 삭제하고 그 위에 있는 보드의 값을 아래에 반영해준다.
  const removeBoardLine = (
    boardX: number,
    boardY: number,
    blockType: BlockType,
    positions: Position[],
  ) => {
    const newBoard = board.map((row) => [...row]);
    // let currentBoardY: number[] = [];

    for (let position of positions) {
      const { x: blockX, y: blockY } = position;

      // board 에는 블럭의 값이 반영이 안되어있어서 현재 블럭 값 넣어줌. - fixToBoard 랑 겹치나?
      console.log(`position = ${position}`);

      newBoard[boardY + blockY][boardX + blockX] = blockType;

      // if (!currentBoardY.includes(boardY + blockY)) {
      //   currentBoardY.push(boardY + blockY);
      // }
    }

    for (let y = newBoard.length - 1; y >= 0; y--) {
      const isRemove = newBoard[y].every((x) => x !== null);

      if (isRemove) {
        for (let i = y; i >= 0; i--) {
          newBoard[i] = newBoard[i - 1];
        }
        newBoard[0] = new Array(10).fill(null);
        y++;
      }
    }

    // 삭제 해야될 Y 값 추출
    // const removeBoardY = currentBoardY.filter((posY) =>
    //   newBoard[posY].every((type) => type !== null),
    // );
    //
    // const removeBoardLength = removeBoardY.length;
    //
    // if (removeBoardLength > 0) {
    //   const maxRemoveBoardY = Math.max(...removeBoardY);
    //
    //   for (let posY = maxRemoveBoardY; posY >= 0; posY--) {
    //     newBoard[posY] = newBoard[posY - removeBoardLength];
    //
    //     if (!newBoard[posY]) {
    //       newBoard[posY] = new Array(10).fill(null);
    //     }
    //   }
    // }
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
    <TetrisWrapper>
      <BoardWrapper>
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
                  {isBlock ? "" : boardValue}
                </Cell>
              );
            })}
          </Row>
        ))}
      </BoardWrapper>
      <InfoWrapper>
        {/*<div className="next-block"></div>*/}
        <div className="time">
          <h2>TIME</h2>

          <span>{dayjs.duration(time, "seconds").format("HH:mm:ss")}</span>
        </div>
        {/*<div className="score">*/}
        {/*  <h2>SCORE</h2>*/}
        {/*  <span>100</span>*/}
        {/*</div>*/}
        {/*<div className="level">*/}
        {/*  <h2>Level</h2>*/}
        {/*  <span>1</span>*/}
        {/*</div>*/}
      </InfoWrapper>
      <GameOverWrapper isVisible={!isPlaying}>
        <b>Game Over</b>
        <span className="score_text">score : 100</span>
        <button type="button" onClick={playStart}>
          Play Again
        </button>
      </GameOverWrapper>
    </TetrisWrapper>
  );
};

export default Board;

const TetrisWrapper = styled.div(() => ({}), {
  display: "flex",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const InfoWrapper = styled.div(() => ({}), {
  marginLeft: "30px",
  h2: {
    fontSize: "14px",
  },
  ".next-block": {
    marginBottom: "20px",
    width: "120px",
    height: "120px",
    border: "2px solid black",
  },
});

const GameOverWrapper = styled.div<{ isVisible: boolean }>(({ isVisible }) => ({
  display: isVisible ? "flex" : "none",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.7)",
  b: {
    fontSize: "40px",
    color: "#f00000",
  },
  button: {
    marginTop: "20px",
    width: "100px",
    height: "48px",
  },
  ".score_text": {
    display: "block",
    marginTop: "30px",
    fontSize: "28px",
    fontWeight: "700",
    color: "white",
  },
}));
const BoardWrapper = styled.div(() => ({}), {
  border: "2px solid #000",
  width: "350px",
});

const Row = styled.div(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Cell = styled.div<{ blockType: BlockType }>(({ blockType }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "35px",
  height: "35px",
  backgroundColor: blockType ? BLOCKS[`${blockType}`].color : "#f2f2f2",
  border: blockType
    ? `6px outset ${BLOCKS[`${blockType}`].color}`
    : "1px solid #e2e2e2",
  boxSizing: "border-box",
  fontSize: "12px",
}));