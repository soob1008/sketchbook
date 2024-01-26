import { ConfigProvider } from "antd";
import React from "react";

import theme from "./styles/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TetrisPage from "./pages/tetris/TetrisPage";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/tetris" element={<TetrisPage />}></Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;