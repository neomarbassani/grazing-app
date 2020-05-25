import styled from 'styled-components/native';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Feather';

import { colors } from '../../styles';

export const Container = styled.View`
  margin-top: 20px;
  flex-direction: row;
  width: 45%;
  justify-content: space-between;
  align-items: center;
`;

export const InputPicker = styled(Picker)`
  width: 110%;
  height: 42px;
  color: ${colors.placeholder};
  background-color: transparent;
`;

export const InputFieldItem = styled(Picker.Item)``;

export const InputPickerIcon = styled(Icon)`
  position: absolute;
  right: 0%;
`;
