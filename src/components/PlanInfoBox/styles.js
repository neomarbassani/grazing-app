import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 80px;
  background: #f7f7f7;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  align-items: center;
  justify-content: space-around;
  margin-top: 15px;
  padding: 14px;
`;

export const Content = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Text = styled.Text`
  font-family: 'WorkSans-Bold';
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #888899;
  margin-top: 10px;
  margin-bottom: 10px;
`;
