import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: ${props => (props.size ? props.size : 100)}%;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 131px;
  border-radius: 10px;
`;

export const Text = styled.Text`
  display: flex;
  text-align: center;
  /* text-align-vertical é referencia à textAlignVertical */
  text-align-vertical: center;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  font-family: 'WorkSans-Bold';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  background-color: ${props => (props.disabled ? '#ffffff99' : '#00000060')};
  padding: 0 10px;
`;
