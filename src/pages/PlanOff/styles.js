import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
  flex: 1;
`;

export const Logo = styled.Image`
  margin-top: 60px;
`;

export const TextBox = styled.View`
  margin-top: 50px;
  width: 90%;
  margin-top: auto;
`;

export const TextBoxItem = styled.View`
  background-color: ${props => (props.color ? props.color : '#fff')};
  padding: 11px 40px;
`;

export const TextBoxItemText = styled.Text`
  font-family: 'WorkSans-Bold';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  color: #281100;
`;

export const TextBoxItemPrice = styled.Text`
  font-family: 'WorkSans-Bold';
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  color: #ffffff;
`;
