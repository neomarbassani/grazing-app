import styled from 'styled-components/native';

export const Content = styled.View`
  width: 100%;
  height: 100%;
  padding: 15px;
  align-items: center;
`;

export const Logo = styled.Image``;

export const Text = styled.Text`
  font-family: 'WorkSans';
  font-style: normal;

  font-size: 14px;
  line-height: 16px;

  color: #888899;

  text-align: justify;
`;

export const TextBold = styled(Text)`
  font-family: 'WorkSans-Bold';
  font-weight: bold;
`;
