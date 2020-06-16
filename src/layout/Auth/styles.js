import styled from 'styled-components/native';

import {Platform, NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;

export const SafeAreaView = styled.SafeAreaView`
  margin-top: ${Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT}px;
  flex: 1;
`;

export const Container = styled.KeyboardAvoidingView`
  background-color: #e5e5e5;
`;

export const ScrollView = styled.ScrollView``;

export const Background = styled.ImageBackground``;
