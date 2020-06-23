/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {Container, Text, ImageBackground} from './styles';

export default function ChooseItemButtom({content, source, loading, ...rest}) {
  return (
    <Container {...rest}>
      <ImageBackground
        imageStyle={{borderRadius: 10}}
        source={source}
        resizeMode="cover"
        resizeMethod="resize">
        <Text>{content}</Text>
      </ImageBackground>
    </Container>
  );
}
