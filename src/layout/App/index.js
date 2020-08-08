/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar, View, Platform} from 'react-native';

import {Container, Background} from './styles';

export default function AppContainer({children, results, ...rest}) {
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'dark-content' : 'light-content'}
        backgroundColor="#fff"
      />
      <Background>
        <Container
          imageStyle={{
            borderBottomLeftRadius: results ? 0 : 15,
            borderBottomRightRadius: results ? 0 : 15,
          }}
          results={results}
          {...rest}>
          {children}
        </Container>
      </Background>
    </View>
  );
}
