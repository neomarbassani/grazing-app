import styled from 'styled-components/native';

import { colors } from '../../styles';

export const BoxTitle = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${(props) => (props.mt ? props.mt : 0)}px;
  margin-bottom: ${(props) => (props.mb ? props.mb : 0)}px;
`;

export const Text = styled.Text`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: bold;
  font-size: ${(props) => props.size}px;
  line-height: 28px;
  color: ${colors.title};
`;
