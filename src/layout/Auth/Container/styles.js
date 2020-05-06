import styled from 'styled-components/native';
import { colors } from '../../../styles';

export const Container = styled.KeyboardAvoidingView`
  width: 100%;
  flex: 1;
  background-color: ${colors.background};
`;

export const ScroolView = styled.ScrollView`
  width: 100%;
  flex: 1;
`;
