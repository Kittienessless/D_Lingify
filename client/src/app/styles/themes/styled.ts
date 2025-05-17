export interface ITheme {
  colors: {
    primary: string
    secondary: string
    success: string
    danger: string
    container: string,
    bg: string,
    font: string,
    fontContrast: string,
    menu :string;
    fontHover: string;
    fontSecondary: string;
    blue: string;
  }
visibility: {
  visible : string;
  not: string;
}
border: {
  color: string;
  size: string;
  
}
  
} 
export enum ThemeEnum  {
  light = "light",
  dark = "dark"
}
