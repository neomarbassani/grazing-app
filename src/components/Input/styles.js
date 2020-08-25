import styled from 'styled-components/native';

import {colors} from '../../styles';
import {TextInputMask} from 'react-native-masked-text';

export const Container = styled.View`
  margin-bottom: ${props => (props.mb ? props.mb : '45')}px;
  align-items: flex-start;
  height: ${props => (props.textarea ? '200px' : '42px')};
  width: 100%;
`;

export const Content = styled.View`
  height: ${props => (props.textarea ? '200px' : '42px')};
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

  flex: 1;
  align-items: center;
  justify-content: center;

  elevation: 1000;
`;

export const InputField = styled.TextInput`
  /* alinhar o texto no topo */
  text-align-vertical: top;

  width: 95%;
  height: ${props => (props.textarea ? 'auto' : '42px')};
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
export const InputFieldDate = styled.TextInput`
  width: 95%;
  height: 100%;
  border: none;
  background-color: transparent;
  color: ${colors.placeholder};
  font-family: 'WorkSans-Regular';
`;

export const InputFieldMask = styled(TextInputMask)`
  width: 95%;
  height: 100%;
  border: none;
  background-color: transparent;
  color: ${colors.placeholder};
  font-family: 'WorkSans-Regular';
`;
