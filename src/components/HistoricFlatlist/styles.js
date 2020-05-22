import styled from 'styled-components/native';

export const Container = styled.FlatList`
  width: 100%;
`;

export const DateGroup = styled.Text`
  font-family: 'WorkSans-Bold';
  font-size: 16px;
  line-height: 19px;
  align-self: flex-start;
  color: #774d37;
  margin: 16px 0px;
`;

export const Group = styled.View``;

export const Item = styled.View`
  height: 70px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #e6e6e6;
  margin: 5px 0;
  padding: 0 0 10px 0;
`;

export const MiddleSection = styled.View`
  margin-left: 8px;
  justify-content: space-between;
  height: 60px;
`;

export const DateItem = styled.Text`
  font-family: 'WorkSans';
  font-size: 14px;
  line-height: 16px;
  color: #c4c4c4;
  position: absolute;
  top: 0;
  right: 0;
`;

export const CowContainer = styled.View`
  width: 60px;
  height: 60px;
  background: #774d37;
  border-radius: 5px;

  align-items: center;
  justify-content: center;
`;

export const CowImage = styled.Image`
  width: 32px;
`;

export const TitleItem = styled.Text`
  font-family: 'WorkSans-Bold';
  font-size: 12px;
  line-height: 14px;
  color: #774d37;
`;

export const CategoryItem = styled.Text`
  font-family: 'WorkSans';
  font-size: 12px;
  line-height: 14px;
  color: #d09776;
`;

export const ResultBox = styled.View`
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  flex-direction: row;
  background: #d69d2b;
  border-radius: 100px;
`;

export const ResultTextTitle = styled.Text`
  font-family: 'WorkSans';
  font-size: 12px;
  line-height: 14px;
  color: #774d37;
  margin-right: 10px;
`;

export const ResultTextContent = styled.Text`
  font-family: 'WorkSans-Bold';
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
`;
