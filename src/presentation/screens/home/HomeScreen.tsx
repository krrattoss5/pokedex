import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {getPokemons} from '../../../actions/pokemons';
import {PokeballBg} from '../../components/ui/PokeballBg';
import {Text, useTheme} from 'react-native-paper';
import {globalTheme} from '../../../config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../../components/pokemons/PokemonCard';
import {FAB} from 'react-native-paper';
import {RootStackParamList} from '../../../navigation/RootStackParams';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<RootStackParamList, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const theme = useTheme();

  const queryClient = useQueryClient();

  // Esto es una peticion comun
  // const {isLoading, data: pokemon = []} = useQuery({
  //   queryKey: ['pokemons'],
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 60,
  // });

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
    // queryFn: params => getPokemons(params.pageParam), // Peticion sencilla

    // aqui se guardan los datos individuales ya cargados con una key en tanstackQluery
    queryFn: async params => {
      const pokemons = await getPokemons(params.pageParam);
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });

      return pokemons;
    },
    // es bueno usar esto despues de la peticion para que la data quede correctamente tipada
    getNextPageParam: (lastPage, pages) => pages.length,
    // cuando ya cargan los resultados
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imagePosition} />

      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{paddingTop: top + 20}}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokedex</Text>}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
      />

      <FAB
        label="Buscar"
        style={[
          globalTheme.globalMargin,
          {
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: theme.colors.primary,
          },
        ]}
        onPress={() => navigation.navigate('SearchScreen')}
        mode="elevated"
        color={theme.dark ? 'white' : 'black'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
