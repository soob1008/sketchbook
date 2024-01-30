import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TetrisPage from "./pages/tetris/TetrisPage";
import Layout from "./components/ui/layout/layout";
import { Global } from "@emotion/react";
import { GlobalStyled } from "./styles/global";
import ResumePage from "./pages/ResumePage";

function App() {
  return (
    <>
      <Global styles={GlobalStyled} />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/tetris1" element={<TetrisPage />}></Route>
            <Route path="/resume" element={<ResumePage />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;