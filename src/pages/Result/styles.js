import styled from 'styled-components/native';

export const Content = styled.ScrollView`
  width: 100%;
  padding: 17px;
`;

export const Logo = styled.Image`
  margin: auto;
`;

export const Title = styled.Text`
  font-family: 'WorkSans-Bold';
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  text-align: center;
  color: #ffffff;
  margin-top: 50px;
`;

export const Description = styled.Text`
  font-family: 'WorkSans-Bold';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  color: #ffffff;
  margin-top: 20px;
`;

export const ResultText = styled.Text`
  font-family: 'WorkSans-Bold';
  font-style: normal;
  font-weight: bold;
  font-size: ${({size}) => (size ? size : '80px')};
  text-align: center;
  color: #d69d2b;
`;
