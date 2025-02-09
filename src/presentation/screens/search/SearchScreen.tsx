import React, {useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {globalTheme} from '../../../config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, TextInput, useTheme} from 'react-native-paper';
import {PokemonCard} from '../../components/pokemons/PokemonCard';
import {useQuery} from '@tanstack/react-query';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';

import {
  getPokemonsByIds,
  getPokemonsNamesWithId,
} from '../../../actions/pokemons';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const {isLoading, data: pokemonNameList = []} = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonsNamesWithId(),
  });

  const pokemonNameIdList = useMemo(() => {
    if (!isNaN(Number(searchTerm))) {
      const pokemon = pokemonNameList.find(
        pokemon => pokemon.id === Number(searchTerm),
      );
      return pokemon ? [pokemon] : [];
    }
    if (searchTerm.length === 0) {
      return [];
    }
    if (searchTerm.length < 3) {
      return [];
    }

    return pokemonNameList.filter(pokemon =>
      pokemon.name.includes(searchTerm.toLowerCase()),
    );
  }, [pokemonNameList, searchTerm]);

  const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () =>
      getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10}]}>
      <TextInput
        placeholder="Buscar pokemon"
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          borderRadius: 10,
        }}
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={setSearchTerm}
        value={searchTerm}
      />

      {isLoadingPokemons && (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={{marginTop: 20}}
        />
      )}

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{paddingTop: top + 20}}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: 150}} />}
      />
    </View>
  );
};
