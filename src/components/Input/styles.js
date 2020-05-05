import styled from 'styled-components/native';

import { colors } from '../../styles';

export const Container = styled.View`
  margin-bottom: 45px;
  align-items: flex-start;
  height: 42px;
  width: 100%;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px 0 12px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  width: 100%;
`;

export const ToogleVisility = styled.TouchableOpacity`
  width: 80px;
  height: 40px;
  margin-left: -16px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ToogleVisilityImage = styled.Image`
  padding: 2px;
`;

export const InputField = styled.TextInput`
  width: 100%;
  height: 42px;
  border: none;
  background-color: transparent;
  color: ${colors.placeholder};
`;

export const InputError = styled.Text`
  font-family: 'Work Sans';
  font-style: normal;
  font-size: 12px;
  color: ${colors.error};
`;
