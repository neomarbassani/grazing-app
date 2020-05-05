import styled from 'styled-components/native';

import { colors } from '../../styles';

export const NumberInput = styled.TextInput`
  width: 38px;
  height: 40px;
  background: ${colors.white};
  border: 2px solid #e6e6e6;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  color: ${colors.placeholder};
  font-family: 'WorkSans-Bold';
`;
