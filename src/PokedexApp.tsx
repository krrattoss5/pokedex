import 'react-native-gesture-handler';
import React from 'react';
import {StackNavigation} from './presentation/navigation/StackNavigation';
import {ThemeContextProvider} from './presentation/context/ThemeContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <ThemeContextProvider>
      <StackNavigation />
    </ThemeContextProvider>
  </QueryClientProvider>
);
