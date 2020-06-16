import styled from 'styled-components/native';

import {Platform, NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;

export const ScrollView = styled.ScrollView``;

export const Background = styled.ImageBackground`
  flex: 1;
  margin-top: ${Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT}px;
  background-color: #e5e5e5;
`;
