/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar} from 'react-native';
import {Dimensions} from 'react-native';

import {ScrollView, Background} from './styles';
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

      <Background
        source={backgroundLogo}
        imageStyle={{
          top: 0,
          height: height * 0.8,
        }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: height,
            alignItems: 'center',
            paddingLeft: 16,
            paddingRight: 16,
          }}>
          {children}
        </ScrollView>
      </Background>
    </>
  );
}
