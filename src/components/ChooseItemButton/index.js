import React from 'react';

import {Container, Text, ImageBackground} from './styles';

import backgroundSolution1 from '../../assets/backgroundSolution1.png';

export default function ChooseItemButtom({content, loading, ...rest}) {
  return (
    <Container {...rest}>
      <ImageBackground
        source={backgroundSolution1}
        imageStyle={{borderRadius: 10}}>
        <Text>{content}</Text>
      </ImageBackground>
    </Container>
  );
}
