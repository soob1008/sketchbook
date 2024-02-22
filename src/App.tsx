import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./components/ui/layout/layout";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { antdTheme, theme } from "@styles/theme";
import { Global, ThemeProvider } from "@emotion/react";
import { GlobalStyled } from "@styles/global";
import { Provider } from "react-redux";
import { reduxStore } from "@components/todo/redux/store";
import { ROUTES, SERVICE_ROUTES, TRANSITION_ROUTES } from "./route";
import RouteTransition from "@ui//RouteTransition";
import styled from "@emotion/styled";

function App() {
  const location = useLocation();

  return (
    <ConfigProvider theme={antdTheme}>
      <StyleProvider>
        <ThemeProvider theme={theme}>
          <Provider store={reduxStore}>
            <Global styles={GlobalStyled} />
            <RouteTransition
              pathname={
                TRANSITION_ROUTES.includes(location.pathname)
                  ? location.pathname
                  : null
              }
            >
              <Routes location={location}>
                {ROUTES.map((route) => (
                  <Route
                    path={route.path}
                    element={
                      <MainLayout>
                        <route.element />
                      </MainLayout>
                    }
                  />
                ))}
                {SERVICE_ROUTES.map((route) => (
                  <Route path={route.path} element={<route.element />} />
                ))}
              </Routes>
            </RouteTransition>
          </Provider>
        </ThemeProvider>
      </StyleProvider>
    </ConfigProvider>
  );
}

export default App;

const TransitionRoute = styled(Route)`
  position: absolute;
`;