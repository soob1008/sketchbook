import "@emotion/react";
import { theme } from "./theme";

type ThemeType = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends ThemeType {
    color: {
      primary: string;
      secondary: string;
      borderGray0: string;
      blue0: string;
      black: string;
      white: string;
    };
  }
}