import TodoListPage from "@pages/todo/TodoListPage";
import HomePage from "@pages/home/HomePage";
import { ReactElement } from "react";
import TodoReduxPage from "@pages/todo/TodoReduxPage";
import TodoZustandPage from "@pages/todo/TodoZustandPage";
import TetrisListPage from "@pages/tetris/TetrisListPage";
import Tetris1Page from "@pages/tetris/Tetris1Page";
import MineSweeperListPage from "@pages/minesweeper/MineSweeperListPage";
import MineSweeper1Page from "@pages/minesweeper/MineSweeper1Page";
import PianoPage from "@pages/piano/PianoPage";
import ResumePage from "@pages/ResumePage";

interface Route {
  path: string;
  element: () => ReactElement;
}

export const ROUTES: Route[] = [
  {
    path: "/",
    element: HomePage,
  },
  {
    path: "/todo",
    element: TodoListPage,
  },
  {
    path: "/todo/redux",
    element: TodoReduxPage,
  },
  {
    path: "/todo/zustand",
    element: TodoZustandPage,
  },
  {
    path: "/tetris",
    element: TetrisListPage,
  },
  {
    path: "/tetirs/1",
    element: Tetris1Page,
  },
  {
    path: "/minesweeper",
    element: MineSweeperListPage,
  },
  {
    path: "/minesweeper/1",
    element: MineSweeper1Page,
  },
  {
    path: "/piano",
    element: PianoPage,
  },
  {
    path: "/resume",
    element: ResumePage,
  },
];