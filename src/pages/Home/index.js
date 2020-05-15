import React from 'react';

import Container from '../../layout/App/Container';

import Title from '../../components/Title';
import SubTitle from '../../components/SubTitle';
import ChooseItemButton from '../../components/ChooseItemButton';

import { Content, ContentToSelect } from './styles';

const Home = ({ navigation }) => {
  return (
    <Container>
      <Title size={24} value="Realizar novo cálculo" />
      <Content>
        <SubTitle value="Pastoreio rotativo" size={16} />
        <ContentToSelect>
          <ChooseItemButton
            content="Número de animais no sistema"
            onPress={() => {}}
          />
          <ChooseItemButton
            content="Número de dias dos animais nas faixas"
            onPress={() => {}}
          />
          <ChooseItemButton
            content="Número total de faixas"
            onPress={() => {}}
          />
          <ChooseItemButton content="Quantidade de ração" onPress={() => {}} />
          <ChooseItemButton content="Área do potreiro" onPress={() => {}} />
        </ContentToSelect>
        <SubTitle value="Pastoreio continuo" size={16} />
        <ContentToSelect>
          <ChooseItemButton
            content="Dimencionar tamanho do potreiro"
            onPress={() => {}}
          />
          <ChooseItemButton
            content="Quantidade de suplemento"
            onPress={() =>
              navigation.navigate(
                'ChooseBovineType',
                'Quantidade de suplemento',
              )
            }
          />
          <ChooseItemButton content="Ajustar locatação" onPress={() => {}} />
        </ContentToSelect>
      </Content>
    </Container>
  );
};

export default Home;
