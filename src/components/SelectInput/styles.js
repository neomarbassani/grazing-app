import styled from 'styled-components/native';
import RNPickerSelect from 'react-native-picker-select';

import { colors } from '../../styles';

export const Container = styled.View`
  margin-bottom: 45px;
  align-items: flex-start;
  width: 100%;
`;

export const SelectInput = styled(RNPickerSelect)`
  height: 42px;
  border: none;
  font-family: 'WorkSans-Regular';
`;

export const InputError = styled.Text`
  font-family: 'WorkSans-Bold';
  font-style: normal;
  font-size: 12px;
  color: ${colors.error};
`;
