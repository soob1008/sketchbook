const breakpoints = [768, 1200];
export const media = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const theme = {
  color: {
    primary: "#F59B40",
    secondary: "#FFCA46",
    blue0: "#3987F8",
    borderGray0: "#e2e2e2",
    black: "#222222",
    white: "#ffffff",
  },
};

export default theme;