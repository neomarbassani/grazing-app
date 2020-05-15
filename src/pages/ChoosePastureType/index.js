import React from 'react';

import Container from '../../layout/App/Container';

import Title from '../../components/Title';
import SubTitle from '../../components/SubTitle';
import ChooseItemButton from '../../components/ChooseItemButton';

import { Content, ContentToSelect } from './styles';

const ChoosePastureType = ({ navigation }) => {
  const TitleOfPage = navigation.state.params;

  return (
    <Container>
      <Title size={24} value={TitleOfPage} />
      <Content>
        <SubTitle value="Tipo de pastagem" size={16} />
        <ContentToSelect>
          <ChooseItemButton content="Campo Nativo" onPress={() => {}} />
          <ChooseItemButton content="Aveia-Azevém" onPress={() => {}} />
          <ChooseItemButton content="Sudão" onPress={() => {}} />
          <ChooseItemButton
            content="Campo nativo melhorado"
            onPress={() => {}}
          />
          <ChooseItemButton content="Sorgo" onPress={() => {}} />
        </ContentToSelect>
      </Content>
    </Container>
  );
};

export default ChoosePastureType;
