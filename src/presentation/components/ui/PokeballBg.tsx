import React, {useContext} from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';

interface Props {
  style?: StyleProp<ImageStyle>;
}

export const PokeballBg = ({style}: Props) => {
  const {isDark} = useContext(ThemeContext);

  const pokemonImg = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-light.png');

  return (
    <Image
      source={pokemonImg}
      style={[
        {
          width: 300,
          height: 300,
          opacity: 0.3,
        },
        style,
      ]}
    />
  );
};
