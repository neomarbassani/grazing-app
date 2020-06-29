import styled from 'styled-components/native';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Feather';

import {colors} from '../../styles';

export const Container = styled.View`
  margin-bottom: 45px;
  align-items: flex-start;
  height: 42px;
  width: ${props => (props.width ? props.width : 0)}%;
`;

export const Content = styled.View`
  flex-direction: row;
  width: 100%;
  background: #ffffff;
  border: 2px solid #d9d9d9;
  border-radius: 5px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

export const Label = styled.Text`
  font-family: 'WorkSans-Bold';
  font-size: 16px;
  line-height: 19px;
  color: #888899;
  margin-bottom: 7px;
`;

export const InputField = styled(Picker)`
  width: 100%;
  height: 42px;
  color: ${colors.placeholder};
  background-color: transparent;
`;

export const InputFieldItem = styled(Picker.Item)``;

export const IconPicker = styled(Icon)`
  position: absolute;
  right: 5px;
`;
