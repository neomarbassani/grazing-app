/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar} from 'react-native';
import {Dimensions} from 'react-native';

import {Container, ScrollView, Background, SafeAreaView} from './styles';
import {colors} from '../../styles';

import backgroundLogo from '../../assets/backgroundLogo.png';

const {height} = Dimensions.get('window');

export default function AuthContainer({children}) {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
        translucent={true}
      />
      <SafeAreaView>
        <Container>
          <Background
            source={backgroundLogo}
            imageStyle={{
              top: 0,
              height: '80%',
            }}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                height,
                alignItems: 'center',
                paddingLeft: 16,
                paddingRight: 16,
              }}>
              {children}
            </ScrollView>
          </Background>
        </Container>
      </SafeAreaView>
    </>
  );
}
