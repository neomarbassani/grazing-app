import styled from 'styled-components/native';

import {Platform, NativeModules, Dimensions} from 'react-native';
const {StatusBarManager} = NativeModules;
const {height} = Dimensions.get('window');

export const Container = styled.View`
  width: 100%;
  height: ${height - 60};
  background-color: #fff;
  align-items: center;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;

export const Background = styled.ImageBackground`
  margin-top: ${Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT}px;
  background-color: #281100;
`;
