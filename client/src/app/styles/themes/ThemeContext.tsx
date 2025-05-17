import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useThemeMode } from './useThemeMode.ts';
import { lightTheme, darkTheme } from './theme.ts';

export const ThemeContext: React.FC = ({ children  }: any) => {
  const { theme } = useThemeMode();

  const themeMode = theme === 'dark' ? darkTheme : lightTheme;

  return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>;
};

 