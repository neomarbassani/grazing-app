import styled from 'styled-components/native';
import { CodeField } from 'react-native-confirmation-code-field';

import { colors } from '../../styles';

export const VerificationCodeArea = styled.View`
  align-items: flex-start;
`;

export const BoxCodeField = styled(CodeField)`
  align-items: center;
  justify-content: center;
`;

export const Input = styled.Text`
  width: 38px;
  height: 40px;
  background: ${colors.white};
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 28px;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${colors.placeholder};
`;
