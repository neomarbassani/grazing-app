/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {Container, Text, ImageBackground} from './styles';

export default function ChooseItemButtom({
  content,
  source,
  disabled,
  loading,
  ...rest
}) {
  return (
    <Container disabled={disabled} {...rest}>
      <ImageBackground
        imageStyle={{borderRadius: 10}}
        source={source}
        resizeMode="cover"
        resizeMethod="resize">
        <Text disabled={disabled}>{content}</Text>
      </ImageBackground>
    </Container>
  );
}
