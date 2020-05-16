import styled from 'styled-components/native';

export const ContainerBackground = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
`;

export const Logo = styled.Image`
  width: 211px;
  margin-top: 60px;
`;

export const ResultBoxTitle = styled.Text`
  font-family: 'WorkSans-Bold';
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
`;

export const ResultBox = styled.View`
  width: 90%;
  padding: 36px 20px 36px 20px;
  align-items: center;
  justify-content: center;
  background: #d69d2b;
  border-radius: 5px;
  margin-top: 16px;
`;

export const ResultText = styled.Text`
  font-family: 'WorkSans-Bold';
  font-style: normal;
  font-size: 40px;
  line-height: 40px;
  text-align: center;
  color: #ffffff;
`;

export const Link = styled.Text`
  font-family: 'WorkSans-Bold';
  font-style: normal;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #d69d2b;
  margin-top: auto;
  margin-bottom: 46px;
`;
