export type Block = "I" | "L" | "J" | "T" | "O" | "S" | "Z";
export interface BoardIndex {
  rowIndex: number;
  cellIndex: number;
}

export type Position = {
  x: number;
  y: number;
};

export const tetrisData = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //10
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 20
];

export type TetrisElementType = number[][][];
export const tetrisElement: number[][][] = [
  [
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1],
  ],
  [
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
  ],
  [
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
  ],
  [
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
  ],
];

// 블럭 정의 - 상대 좌표 정의하는 법
export const NEW_BLOCKS = {
  I: {
    status: [
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
      ],
    ],
  },
};

export const BLOCKS = {
  I: {
    status: [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],

      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ],
    color: "#ff5858",
  },
  L: {
    status: [
      [
        [2, 0, 0, 0],
        [2, 2, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 2, 2, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [2, 2, 2, 0],
        [0, 0, 2, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
    color: "#3f5aed",
  },
  J: {
    status: [
      [
        [0, 0, 3, 0],
        [3, 3, 3, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 3, 0, 0],
        [0, 3, 0, 0],
        [0, 3, 3, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [3, 3, 3, 0],
        [3, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [3, 3, 0, 0],
        [0, 3, 0, 0],
        [0, 3, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
    color: "orange",
  },
  T: {
    status: [
      [
        [0, 4, 0, 0],
        [4, 4, 4, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 4, 0, 0],
        [0, 4, 4, 0],
        [0, 4, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [4, 4, 4, 0],
        [0, 4, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 4, 0, 0],
        [4, 4, 0, 0],
        [0, 4, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
    color: "#bc12cc",
  },
  O: {
    status: [
      [
        [0, 5, 5, 0],
        [0, 5, 5, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
    color: "yellow",
  },
  S: {
    status: [
      [
        [0, 6, 6, 0],
        [6, 6, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 6, 0, 0],
        [0, 6, 6, 0],
        [0, 0, 6, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [6, 6, 0, 0],
        [0, 6, 6, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 6, 0, 0],
        [6, 6, 0, 0],
        [6, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
    color: "skyblue",
  },
  Z: {
    status: [
      [
        [7, 7, 0, 0],
        [0, 7, 7, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 7, 0, 0],
        [7, 7, 0, 0],
        [7, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [7, 7, 0, 0],
        [0, 7, 7, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 7, 0],
        [0, 7, 7, 0],
        [0, 7, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
    color: "#15dd15",
  },
};