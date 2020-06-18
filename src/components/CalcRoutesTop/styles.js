import styled from 'styled-components/native';
import {colors} from '../../styles';

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

export const Text = styled.Text`
  font-family: 'WorkSans-Bold';
  font-size: 14px;
  line-height: 14px;
  color: ${colors.primary};
`;
