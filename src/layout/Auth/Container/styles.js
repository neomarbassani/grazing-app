import styled from 'styled-components/native';
import { colors } from '../../../styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  background-color: ${colors.background};
`;
