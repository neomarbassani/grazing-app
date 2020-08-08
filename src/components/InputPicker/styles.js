import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import RNPickerSelect from 'react-native-picker-select';

import {colors} from '../../styles';

export const Container = styled.View`
  margin-bottom: 25px;
  width: ${props => (props.width ? props.width : 0)}%;
`;

export const Content = styled.View`
  background: #ffffff;
  border: 2px solid #d9d9d9;
  border-radius: 5px;
  padding: 0 10px;
  width: 100%;
`;

export const Label = styled.Text`
  font-family: 'WorkSans-Bold';
  font-size: 16px;
  line-height: 19px;
  color: #888899;
  margin-bottom: 7px;
`;

export const InputField = styled(RNPickerSelect)`
  width: 100%;
  height: 42px;

  color: ${colors.placeholder};
  background-color: transparent;
`;

/* export const InputFieldItem = styled(Picker.Item)``;
 */
export const IconPicker = styled(Icon)`
  position: absolute;
  right: 5px;
`;
