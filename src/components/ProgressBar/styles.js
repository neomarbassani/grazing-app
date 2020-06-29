import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 5px;
  align-items: flex-start;
`;

export const Progress = styled.View`
  width: ${props => (props.size ? props.size : 0)}%;
  height: 5px;
  background: #7b912b;
  border-radius: 100px;
`;
