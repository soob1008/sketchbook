import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import TetrisPage from "./pages/tetris/TetrisPage";
import MainLayout from "./components/ui/layout/layout";
import ResumePage from "./pages/ResumePage";
import { ConfigProvider } from "antd";
import { px2remTransformer, StyleProvider } from "@ant-design/cssinjs";
import antdTheme from "./styles/theme";
import { Global } from "@emotion/react";
import { GlobalStyled } from "./styles/global";

const px2rem = px2remTransformer({
  rootValue: 10, // 32px = 1rem; @default 16
});

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <StyleProvider>
        <Global styles={GlobalStyled} />
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/tetris1" element={<TetrisPage />}></Route>
              <Route path="/resume" element={<ResumePage />}></Route>
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </StyleProvider>
    </ConfigProvider>
  );
}

export default App;