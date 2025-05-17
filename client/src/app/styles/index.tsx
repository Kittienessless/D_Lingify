import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useThemeMode } from "../styles/themes/useThemeMode.ts";
import { lightTheme, darkTheme } from './themes/theme.ts'

interface ThemeProps {
  children: React.ReactNode
}

export const ThemeContext = ({ children } : ThemeProps) => {
  const { theme } = useThemeMode();

  const themeMode = theme === 'dark' ? darkTheme : lightTheme;

  return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>;
};

