import React from 'react';

import Container from '../../layout/App/Container';

import Title from '../../components/Title';
import SubTitle from '../../components/SubTitle';
import ChooseItemButton from '../../components/ChooseItemButton';

import { Content, ContentToSelect } from './styles';

const ChooseBovineType = ({ navigation }) => {
  const TitleOfPage = navigation.state.params;

  return (
    <Container>
      <Title size={24} value={TitleOfPage} />
      <Content>
        <SubTitle value="Bovino de leite" size={16} />
        <ContentToSelect>
          <ChooseItemButton content="Novilha" onPress={() => {}} />
          <ChooseItemButton content="Vaca em lactação" onPress={() => {}} />
        </ContentToSelect>
        <SubTitle value="Bovino de corte" size={16} />
        <ContentToSelect>
          <ChooseItemButton content="Terneiro" onPress={() => {}} />
          <ChooseItemButton
            content="Novilho"
            onPress={() =>
              navigation.navigate(
                'ChoosePastureType',
                'Quantidade de suplemento',
              )
            }
          />
        </ContentToSelect>
      </Content>
    </Container>
  );
};

export default ChooseBovineType;
