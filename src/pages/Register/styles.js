import styled from 'styled-components/native';

export const Logo = styled.Image`
  margin-top: ${props => (props.mt ? props.mt : 0)}px;
  margin-bottom: ${props => (props.mb ? props.mb : 0)}px;
`;

export const FormArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;
