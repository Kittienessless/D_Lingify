import { SkeletonTheme } from "react-loading-skeleton";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { lightTheme, darkTheme } from "../styles/themes/theme.ts";
import "./Layout.scss";

import styled, { ThemeProvider } from "styled-components";
import { TogglerButton } from "shared/ui/Toggler";
import GlobalStyle from "../styles/themes/gloabal.ts";
import { ThemeContext } from "../styles/index.tsx";
import { useThemeMode } from "../styles/themes/useThemeMode.ts";

import  HeaderWidget  from "widgets/header/ui/HeaderWidget.tsx";
import { FooterWidget } from "widgets/footer";
import { observer } from "mobx-react-lite";

 const Layout:React.FC = () => {
  const { theme, themeToggler } = useThemeMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const LayoutM = styled.div`
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.font};
    & svg {
      color: ${({ theme }) => theme.colors.svg};
    }
  `;
  return (
    <ThemeContext>
      <ThemeProvider theme={themeMode}>
        <LayoutM>
          <GlobalStyle />
          <SkeletonTheme>
            <HeaderWidget />
            <body className="layout__content">
              <Outlet />
              <TogglerButton themeToggler={themeToggler} />
            </body>
            <FooterWidget />
            <ScrollRestoration />
          </SkeletonTheme>
        </LayoutM>
      </ThemeProvider>
    </ThemeContext>
  );
};

export default observer(Layout)