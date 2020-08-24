import styled from 'styled-components/native';
import {colors} from '../../styles';

export const Container = styled.ScrollView`
  flex: 1;
  height: 50px;
`;

export const Text = styled.Text`
  font-family: 'WorkSans-Bold';
  font-size: 14px;
  color: ${props => (props.color ? props.color : colors.primary)};
`;
