import { css } from "@emotion/react";
export const GlobalStyled = css`
  @font-face {
    font-family: "Pretendard";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }

  body {
    margin: 0;
    font-family:
      "Pretendard",
      "GmarketSansMedium",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    color: #222;
  }
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  button {
    padding: 0;
    outline: none;
    border: none;
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
`;