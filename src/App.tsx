import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./components/ui/layout/layout";

import { ROUTES, SERVICE_ROUTES, TRANSITION_ROUTES } from "./route";
import RouteTransition from "@ui//RouteTransition";
import styled from "@emotion/styled";

function App() {
  const location = useLocation();

  return (
    <RouteTransition
      pathname={
        TRANSITION_ROUTES.includes(location.pathname) ? location.pathname : null
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
  );
}

export default App;

const TransitionRoute = styled(Route)`
  position: absolute;
`;