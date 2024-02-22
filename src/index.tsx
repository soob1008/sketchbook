import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/reset.css";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { antdTheme, theme } from "@styles/theme";
import { reduxStore } from "@components/todo/redux/store";
import { Global, ThemeProvider } from "@emotion/react";
import { GlobalStyled } from "@styles/global";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ConfigProvider theme={antdTheme}>
      <StyleProvider>
        <ThemeProvider theme={theme}>
          <Provider store={reduxStore}>
            <Global styles={GlobalStyled} />
            <HashRouter>
              <App />
            </HashRouter>
          </Provider>
        </ThemeProvider>
      </StyleProvider>
    </ConfigProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();