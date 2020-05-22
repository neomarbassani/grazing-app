import React from 'react';

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

import cowImage from '../../assets/cow.png';

const HistoricFlatlist = () => {
  return (
    <Container>
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
      <Group>
        <DateGroup>26 de Abril</DateGroup>
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
      <Group>
        <DateGroup>24 de Abril</DateGroup>
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
    </Container>
  );
};

export default HistoricFlatlist;
