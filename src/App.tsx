import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./components/ui/layout/layout";
import ResumePage from "./pages/ResumePage";
import { ConfigProvider } from "antd";
import { px2remTransformer, StyleProvider } from "@ant-design/cssinjs";
import { antdTheme, theme } from "./styles/theme";
import { Global, ThemeProvider } from "@emotion/react";
import { GlobalStyled } from "./styles/global";
import TetrisListPage from "./pages/tetris/TetrisListPage";
import Tetris1Page from "./pages/tetris/Tetris1Page";
import TodoListPage from "./pages/todo/TodoListPage";
import TodoReduxPage from "./pages/todo/TodoReduxPage";
import { Provider } from "react-redux";
import { reduxStore } from "./store/redux";

const px2rem = px2remTransformer({
  rootValue: 10, // 32px = 1rem; @default 16
});

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <StyleProvider>
        <ThemeProvider theme={theme}>
          <Provider store={reduxStore}>
            <Global styles={GlobalStyled} />
            <BrowserRouter>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/todo" element={<TodoListPage />} />
                  <Route path="/todo/redux" element={<TodoReduxPage />} />
                  <Route path="/tetris" element={<TetrisListPage />} />
                  <Route path="/tetris/1" element={<Tetris1Page />} />
                  <Route path="/resume" element={<ResumePage />} />
                </Routes>
              </MainLayout>
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </StyleProvider>
    </ConfigProvider>
  );
}

export default App;