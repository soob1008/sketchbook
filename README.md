# SketchBook

## 테트리스

BLOCKS : block의 타입, 회전 시 나타내야 할 모양에 대한 값, 컬러를 상수로 가지고 있다.

### state value
board - 10 x 20 이차원 배열

block - 4 x 4 이차원 배열
        
    필요한 값 -> 블럭의 좌표, 블럭타입, 블럭의 상태값
    position: {x, y}

    blockType: "I" | "L" | "J" | "T" | "O" | "S" | "Z"

    blockIndex


### 좌표 값 함수 - getBlockPositions 
블럭(4x4) 중에 값이 있는 좌표의 값만 리턴 하는 함수

[{x:0, y:0}, ...]
상대좌표이므로 보드에 값을 나타낼 때에는 rowIndex, cellIndex 를 더해주어 절대좌표로 바꿔야 한다.
In the project directory, you can run:

### 키보드 이벤트 handleKeyDown
키보드를 누르면 블럭이 이동 가능한지 여부를 체크하고 true 이면 이동 시킨다.

* 이전에는 useEffect에 dependency로 빈 배열을 넣어야 한 번 렌더링 됐는데
리액트 업데이트로 dependency가 선택사항으로 바뀌었다.

### 블럭 이동 가능 여부 체크 - checkCells
#### param 
x, y: 체크해야하는 위치의 좌표값 (ex. 오른쪽 이동이면 x + 1

getPosition(blockType, blockIndex) : 블럭의 좌표값

#### 벽 막기
블럭의 절대좌표가 0 보다 작거나 x는 10 이상, y는 20 이상일 경우 false 리턴

#### 보드의 값 검사
보드에 값이 있을 경우 이동하지 못하게 막기

### 블럭 이동하는 함수 - moveBlock
#### param : (x, y) 
block 값 변경으로 리렌더링

### 보드에 값 반영해주는 함수 - fixToBoard
#### param : (x, y, type: BlockType, positions)
보드의 절대좌표에 blockType 값을 넣어준다. board 값 변경으로 리렌더링

### 렌더링
블럭과 보드를 같이 그려주어야 한다.
#### 블럭과 보드 그려주기
block의 절대 좌표 값 = block 상대좌표 값 + block 기본 위치값 (block.positions)
block의 절대 좌표 값이 board의 인덱스 값이랑 일치하면 블럭 타입값을 넣어주고(블럭 값) 아니면 board에 있는 값(보드값)을 넣어준다.