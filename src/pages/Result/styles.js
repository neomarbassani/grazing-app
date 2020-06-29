import styled from 'styled-components/native';

import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const Content = styled.View`
  width: 100%;
  height: ${screenHeight - 60};
  padding: 17px 30px;
  align-items: center;
`;

export const Logo = styled.Image``;

export const Title = styled.Text`
  font-family: 'WorkSans-Bold';
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  text-align: center;
  color: #ffffff;
  margin-top: 50px;
`;

export const Description = styled.Text`
  font-family: 'WorkSans-Bold';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  color: #ffffff;
  margin-top: 20px;
`;

export const ResultText = styled.Text`
  font-family: 'WorkSans-Bold';
  font-style: normal;
  font-weight: bold;
  font-size: 100px;
  text-align: center;
  color: #d69d2b;
`;
