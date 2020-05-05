import styled from 'styled-components/native';

export const Container = styled.Text`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${(props) => (props.color ? props.color : '#C94324')};
  margin-top: ${(props) => (props.mt ? props.mt : 0)}px;
  margin-bottom: ${(props) => (props.mb ? props.mb : 0)}px;
`;
