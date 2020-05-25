import React, { useState, useEffect } from 'react';

import {
  Container,
  ResultBox,
  CategoryItem,
  CowContainer,
  CowImage,
  DateGroup,
  DateItem,
  Group,
  Item,
  MiddleSection,
  ResultTextContent,
  ResultTextTitle,
  TitleItem,
} from './styles';

import api from '../../services/api';

import cowImage from '../../assets/cow.png';

const HistoricFlatlist = () => {
  const [historic, setHistoric] = useState([]);

  const getHistoric = async () => {
    const response = api.get('history?perPage=10&page=1&grouped=true');

    console.log(response.data);
  };

  useEffect(() => {
    getHistoric();
  }, []);
  return (
    <Container
      data={historic}
      renderItem={({ item }) => (
        <Group>
          <DateGroup>27 de Abril</DateGroup>
          <Item>
            <CowContainer>
              <CowImage source={cowImage} />
            </CowContainer>
            <MiddleSection>
              <TitleItem>Bovino de corte</TitleItem>
              <CategoryItem>Terneiro</CategoryItem>
              <ResultBox>
                <ResultTextTitle>Resultado:</ResultTextTitle>
                <ResultTextContent>59 Animais</ResultTextContent>
              </ResultBox>
            </MiddleSection>
            <DateItem>24/04/2020</DateItem>
          </Item>
          <Item>
            <CowContainer>
              <CowImage source={cowImage} />
            </CowContainer>
            <MiddleSection>
              <TitleItem>Bovino de corte</TitleItem>
              <CategoryItem>Terneiro</CategoryItem>
              <ResultBox>
                <ResultTextTitle>Resultado:</ResultTextTitle>
                <ResultTextContent>59 Animais</ResultTextContent>
              </ResultBox>
            </MiddleSection>
            <DateItem>24/04/2020</DateItem>
          </Item>
        </Group>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default HistoricFlatlist;
