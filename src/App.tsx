import React from "react";

import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./components/ui/layout/layout";
import ResumePage from "./pages/ResumePage";
import { ConfigProvider } from "antd";
import { px2remTransformer, StyleProvider } from "@ant-design/cssinjs";
import { antdTheme, theme } from "@styles/theme";
import { Global, ThemeProvider } from "@emotion/react";
import { GlobalStyled } from "@styles/global";
import TetrisListPage from "./pages/tetris/TetrisListPage";
import Tetris1Page from "./pages/tetris/Tetris1Page";
import TodoListPage from "./pages/todo/TodoListPage";
import TodoReduxPage from "./pages/todo/TodoReduxPage";
import { Provider } from "react-redux";
import MineSweeperListPage from "./pages/minesweeper/MineSweeperListPage";
import MineSweeper1Page from "./pages/minesweeper/MineSweeper1Page";
import { reduxStore } from "@components/todo/redux/store";
import TodoZustandPage from "./pages/todo/TodoZustandPage";
import PianoPage from "@pages/piano/PianoPage";

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <StyleProvider>
        <ThemeProvider theme={theme}>
          <Provider store={reduxStore}>
            <Global styles={GlobalStyled} />
            <HashRouter>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/todo" element={<TodoListPage />} />
                  <Route path="/todo/redux" element={<TodoReduxPage />} />
                  <Route path="/todo/zustand" element={<TodoZustandPage />} />
                  <Route path="/tetris" element={<TetrisListPage />} />
                  <Route path="/tetris/1" element={<Tetris1Page />} />
                  <Route
                    path="/minesweeper"
                    element={<MineSweeperListPage />}
                  />
                  <Route path="/minesweeper/1" element={<MineSweeper1Page />} />
                  <Route path="/piano" element={<PianoPage />} />
                  <Route path="/resume" element={<ResumePage />} />
                </Routes>
              </MainLayout>
            </HashRouter>
          </Provider>
        </ThemeProvider>
      </StyleProvider>
    </ConfigProvider>
  );
}

export default App;