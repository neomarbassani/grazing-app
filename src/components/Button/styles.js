import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background: ${props => (props.color ? props.color : '#d69d2b')};
  border-radius: 5px;
  width: 100%;
  height: 56px;
  margin-top: ${props => (props.mt ? props.mt : 0)};
  margin-bottom: ${props => (props.mb ? props.mb : 0)};
`;

export const Text = styled.Text`
  font-family: 'WorkSans-Bold';
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #ffffff;
`;
