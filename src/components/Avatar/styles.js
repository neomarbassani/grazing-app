import styled from 'styled-components/native';

export const Container = styled.Image`
  width: ${(props) => (props.size ? props.size : 0)}px;
  height: ${(props) => (props.size ? props.size : 0)}px;
  border-radius: ${(props) => (props.size ? props.size / 2 : 0)}px;
  margin-right: ${(props) => (props.mr ? props.mr : 0)}px;
`;
