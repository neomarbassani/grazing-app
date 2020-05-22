import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

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

export const InputField = styled(TextInputMask)`
  width: 100%;
  height: 42px;
  border: none;
  background-color: transparent;
  color: ${colors.placeholder};
  font-family: 'WorkSans-Regular';
`;

export const InputError = styled.Text`
  font-family: 'WorkSans-Bold';
  font-style: normal;
  font-size: 12px;
  color: ${colors.error};
`;
