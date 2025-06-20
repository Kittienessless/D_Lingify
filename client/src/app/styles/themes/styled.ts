export interface ITheme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    container: string;
    bg: string;
    font: string;
    fontContrast: string;
    menu: string;
    fontHover: string;
    fontSecondary: string;
    blue: string;
  };
  visibility: {
    visible: string;
    not: string;
  };
  border: {
    color: string;
    size: string;
  };
  styles: IStyle[];
  gradients: string[];

}
export interface IBlueColor {
   header: string,
    background: string,
    footer: string,
    text: string,
    quoteBgc: string,
    quoteTitle: string,
    quoteBody: string,
    quoteBorder: string,
    border: string,
}
export enum ThemeEnum {
  light = "light",
  dark = "dark",
  pink = 'pink', 
  brown = 'brown', 
  green = 'green', 
  blue = 'blue', 

}
export interface IStyle {
  backgroundColor: string;
   borderColor: string 
}
