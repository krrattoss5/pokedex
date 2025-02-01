import React, {createContext, PropsWithChildren, useMemo} from 'react';

// https://callstack.github.io/react-native-paper/docs/guides/theming-with-react-navigation

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import {
  adaptNavigationTheme,
  PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';

import {useColorScheme} from 'react-native';

const {
  LightTheme: NavigationLightTheme,
  DarkTheme: NavigationDarkThemeAdapted,
} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const mergeTheme = (paperTheme: any, navigationTheme: any) => ({
  ...paperTheme,
  colors: {
    ...paperTheme.colors,
    ...navigationTheme.colors,
  },
});

export const ThemeContext = createContext({
  isDark: false,
  theme: MD3LightTheme,
});

export const ThemeContextProvider = ({children}: PropsWithChildren) => {
  const colorSchema = useColorScheme();
  const isDark = colorSchema === 'dark';

  const theme = useMemo(
    () =>
      isDark
        ? mergeTheme(MD3DarkTheme, NavigationDarkThemeAdapted)
        : mergeTheme(MD3LightTheme, NavigationLightTheme),
    [isDark],
  );

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <ThemeContext.Provider value={{isDark, theme}}>
          {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
