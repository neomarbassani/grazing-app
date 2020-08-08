import styled from 'styled-components/native';

import {Platform, NativeModules, Dimensions} from 'react-native';
const {StatusBarManager} = NativeModules;
const {height} = Dimensions.get('window');

export const Container = styled.ImageBackground`
  flex: 1;

  margin-bottom: ${props => (props.marginValue ? 86 : 0)}px;
  background-color: ${props => (props.results ? '#281100' : '#fff')};
  align-items: center;
  border-bottom-left-radius: ${props => (props.results ? 0 : 30)}px;
  border-bottom-right-radius: ${props => (props.results ? 0 : 30)}px;
`;

export const Background = styled.SafeAreaView`
  flex: 1;
  background-color: #281100;
`;
