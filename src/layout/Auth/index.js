/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar} from 'react-native';

import {ScrollView, Background} from './styles';
import {colors} from '../../styles';

import backgroundLogo from '../../assets/backgroundLogo.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Dimensions} from 'react-native';
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
        <KeyboardAwareScrollView
          contentContainerStyle={{
            alignItems: 'center',
            paddingLeft: 16,
            paddingRight: 16,
          }}>
          {children}
        </KeyboardAwareScrollView>
      </Background>
    </>
  );
}
