import 'react-native-gesture-handler';
import React from 'react';
import {StackNavigation} from './presentation/navigation/StackNavigation';
import {ThemeContextProvider} from './presentation/context/ThemeContext';

export const PokedexApp = () => (
  <ThemeContextProvider>
    <StackNavigation />
  </ThemeContextProvider>
);
