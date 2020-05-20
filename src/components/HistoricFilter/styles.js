import styled from 'styled-components/native';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Feather';

import { colors } from '../../styles';

export const Container = styled.View`
  margin-top: 20px;
  flex-direction: row;
  width: 55%;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

export const InputPicker = styled(Picker)`
  width: 100%;
  height: 42px;
  color: ${colors.placeholder};
  background-color: transparent;
`;

export const InputFieldItem = styled(Picker.Item)``;

export const InputPickerIcon = styled(Icon)`
  position: absolute;
  right: 5px;
`;
