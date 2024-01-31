const breakpoints = [768, 1200];
export const media = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const antdTheme = {
  token: {
    // colorPrimary: "#F59B40",
    colorBgContainer: "#ffffff",
    borderColor: "#e2e2e2",
    fontFamily: "Pretendard",
  },
  components: {
    Layout: {
      /* here is your component tokens */
      headerBg: "#ffffff",
      headerHeight: 64,
      bodyBg: "#ffffff",
      siderBg: "#ffffff",
    },
  },
  cssVar: true,
};

export const theme = {};