import styled from 'styled-components/native';
import { Picker } from '@react-native-community/picker';

import { colors } from '../../styles';

export const Container = styled.View`
  margin-bottom: 45px;
  align-items: flex-start;
  height: 42px;
  width: 100%;
`;

export const InputField = styled(Picker)`
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  width: 100%;
  height: 42px;
  color: ${colors.placeholder};
  font-family: 'WorkSans-Regular';
`;

export const InputError = styled.Text`
  font-family: 'WorkSans-Bold';
  font-style: normal;
  font-size: 12px;
  color: ${colors.error};
`;
