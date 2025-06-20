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
  },
  styles: [
    { backgroundColor: '#FFCDD2', borderColor: '#E57373' },
    { backgroundColor: '#C8E6C9', borderColor: '#81C784' },
    { backgroundColor: '#BBDEFB', borderColor: '#64B5F6' },
    { backgroundColor: '#FFF9C4', borderColor: '#FFF176' },
    { backgroundColor: '#D1C4E9', borderColor: '#9575CD' },
    { backgroundColor: '#FFCCBC', borderColor: '#FF8A65' },
    { backgroundColor: '#B2DFDB', borderColor: '#4DB6AC' },
    { backgroundColor: '#F8BBD0', borderColor: '#F06292' },
    { backgroundColor: '#DCEDC8', borderColor: '#AED581' },
    { backgroundColor: '#FFE0B2', borderColor: '#FFB74D' }
  ],
  gradients: [
    'linear-gradient(45deg, #FFC107, #FF5722)',
    'linear-gradient(45deg,rgb(206, 76, 89), #BBDEFB)',
    'linear-gradient(90deg, #8BC34A, #CDDC39)',
    'linear-gradient(60deg, #E91E63, #9C27B0)',
    'linear-gradient(120deg, #00BCD4, #673AB7)',
    'linear-gradient(30deg, #FFEB3B, #FFC107)',
    'linear-gradient(75deg, #009688, #4CAF50)',
    'linear-gradient(105deg, #FF9800, #FF5722)',
    'linear-gradient(150deg, #607D8B, #795548)',
    'linear-gradient(210deg, #9E9E9E, #212121)'
  ]
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
   },
  styles: [
    { backgroundColor: '#FFCDD2', borderColor: '#E57373' },
    { backgroundColor: '#C8E6C9', borderColor: '#81C784' },
    { backgroundColor: '#BBDEFB', borderColor: '#64B5F6' },
    { backgroundColor: '#FFF9C4', borderColor: '#FFF176' },
    { backgroundColor: '#D1C4E9', borderColor: '#9575CD' },
    { backgroundColor: '#FFCCBC', borderColor: '#FF8A65' },
    { backgroundColor: '#B2DFDB', borderColor: '#4DB6AC' },
    { backgroundColor: '#F8BBD0', borderColor: '#F06292' },
    { backgroundColor: '#DCEDC8', borderColor: '#AED581' },
    { backgroundColor: '#FFE0B2', borderColor: '#FFB74D' }
  ],
  gradients: [
    'linear-gradient(45deg, #FFC107, #FF5722)',
    'linear-gradient(45deg,rgb(206, 76, 89), #BBDEFB)',
    'linear-gradient(90deg, #8BC34A, #CDDC39)',
    'linear-gradient(60deg, #E91E63, #9C27B0)',
    'linear-gradient(120deg, #00BCD4, #673AB7)',
    'linear-gradient(30deg, #FFEB3B, #FFC107)',
    'linear-gradient(75deg, #009688, #4CAF50)',
    'linear-gradient(105deg, #FF9800, #FF5722)',
    'linear-gradient(150deg, #607D8B, #795548)',
    'linear-gradient(210deg, #9E9E9E, #212121)'
  ]
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
    
   },
  styles: [
    { backgroundColor: '#FFCDD2', borderColor: '#E57373' },
    { backgroundColor: '#C8E6C9', borderColor: '#81C784' },
    { backgroundColor: '#BBDEFB', borderColor: '#64B5F6' },
    { backgroundColor: '#FFF9C4', borderColor: '#FFF176' },
    { backgroundColor: '#D1C4E9', borderColor: '#9575CD' },
    { backgroundColor: '#FFCCBC', borderColor: '#FF8A65' },
    { backgroundColor: '#B2DFDB', borderColor: '#4DB6AC' },
    { backgroundColor: '#F8BBD0', borderColor: '#F06292' },
    { backgroundColor: '#DCEDC8', borderColor: '#AED581' },
    { backgroundColor: '#FFE0B2', borderColor: '#FFB74D' }
  ],
  gradients: [
    'linear-gradient(45deg, #FFC107, #FF5722)',
    'linear-gradient(45deg,rgb(206, 76, 89), #BBDEFB)',
    'linear-gradient(90deg, #8BC34A, #CDDC39)',
    'linear-gradient(60deg, #E91E63, #9C27B0)',
    'linear-gradient(120deg, #00BCD4, #673AB7)',
    'linear-gradient(30deg, #FFEB3B, #FFC107)',
    'linear-gradient(75deg, #009688, #4CAF50)',
    'linear-gradient(105deg, #FF9800, #FF5722)',
    'linear-gradient(150deg, #607D8B, #795548)',
    'linear-gradient(210deg, #9E9E9E, #212121)'
  ]
};
 