import React from 'react';
import {HomeScreen} from '../screens/home/HomeScreen';
import {SearchScreen} from '../screens/search/SearchScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {PokemonScreen} from '../screens/pokemon/PokemonScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: {PokemonId: number};
  SearchScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};
