import styled from 'styled-components/native';

import {colors} from '../../styles';
import {TextInputMask} from 'react-native-masked-text';

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
  border: 2px solid #d9d9d9;
  border-radius: 5px;
  width: 100%;
`;

export const Label = styled.Text`
  font-family: 'WorkSans-Bold';
  font-size: 16px;
  line-height: 19px;
  color: ${props => (props.color ? props.color : '#888899')};
  margin-bottom: 7px;
`;

export const ToogleVisility = styled.TouchableOpacity`
  width: 80px;
  height: 40px;
  margin-left: -16px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const InputField = styled.TextInput`
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
export const InputFieldMask = styled(TextInputMask)`
  width: 100%;
  height: 42px;
  border: none;
  background-color: transparent;
  color: ${colors.placeholder};
  font-family: 'WorkSans-Regular';
`;
