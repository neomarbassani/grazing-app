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

export const ToogleVisility = styled.TouchableOpacity``;

export const ToogleVisilityImage = styled.Image``;

export const InputField = styled.TextInput`
  width: 90%;
  height: 42px;
  border: none;
  background-color: transparent;
  color: ${colors.placeholder};
`;

export const Label = styled.Text`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.label};
  margin-bottom: 7px;
`;

export const InputError = styled.Text`
  font-family: 'Work Sans';
  font-style: normal;
  font-size: 12px;
  color: ${colors.error};
`;
