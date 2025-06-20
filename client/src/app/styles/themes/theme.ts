import { ITheme, ThemeEnum } from "./styled";
import { DefaultTheme } from "styled-components";

export const baseTheme: ITheme = {
  colors: {
    primary: "#0091ff",
    secondary: "#2b2b2b",
    success: "#4caf50",
    danger: "#f44336 ",
    container: "rgb(245, 245, 245)",
    bg: "white",
    font: "black",
    fontContrast: 'white',
    menu:'rgb(238, 238, 238)',
    fontHover: 'rgb(82, 82, 82)',
    fontSecondary:'rgb(173, 173, 173)',
    blue: 'rgb(207, 225, 241)',

  },
  visibility: {
    visible: "block",
    not: "none",
  },
  border : {
    color: '1px solid  rgb(0, 35, 61)',
    size: '10px'
  }
};

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  type: ThemeEnum.light,
  colors: {
    ...baseTheme.colors,
    bg: "white",
    font: "#19191B",
    container: "rgb(245, 245, 245)",
    svg: "black",
    primary: "#0091ff",
    fontContrast: 'rgb(255, 255, 255)',
    menu:'rgb(255, 255, 255)',
    fontHover: '#cacaca',
    fontSecondary:'rgb(173, 173, 173)',
    blue: 'rgb(207, 225, 241)',

  },
  visibility: {
    visible: "block",
    not: "none",
  },
  border : {
    color: 'rgb(0, 23, 41)',
   }
};

export const darkTheme: DefaultTheme = {
  ...baseTheme,
  type: ThemeEnum.dark,

  colors: {
    ...baseTheme.colors,
    bg: "#19191B",
    font: "#E5E4E8",
    container: "rgb(49, 49, 49)",
    svg: "white",
    primary: "#0a4b80",
    fontContrast: 'rgb(255, 255, 255)',
    menu:'rgb(73, 73, 73)',
    fontHover:'rgb(122, 122, 122)',
    fontSecondary:'rgb(173, 173, 173)',
    blue: 'rgb(71, 85, 129)',

  },
  visibility: {
    visible: "block",
    not: "none",
  },
  border : {
    color: "#0091ff",
    
   }
};
