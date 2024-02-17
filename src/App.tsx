import React from "react";

import { HashRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/ui/layout/layout";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { antdTheme, theme } from "@styles/theme";
import { Global, ThemeProvider } from "@emotion/react";
import { GlobalStyled } from "@styles/global";
import { Provider } from "react-redux";
import { reduxStore } from "@components/todo/redux/store";
import { ROUTES } from "./route";

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
                  {ROUTES.map((route) => (
                    <Route path={route.path} element={<route.element />} />
                  ))}
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