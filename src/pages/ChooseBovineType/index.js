import React from 'react';

import Container from '../../layout/App';

import SubTitle from '../../components/SubTitle';
import ChooseItemButton from '../../components/ChooseItemButton';
import ProgressBar from '../../components/ProgressBar';
import CalcHeader from '../../components/CalcHeader';
import CalcRoutesTop from '../../components/CalcRoutesTop';

import {Content} from './styles';

const ChooseBovineType = ({navigation, route}) => {
  const {calc} = route.params;

  const items = [calc.name];

  return (
    <Container>
      <ProgressBar size={37.5} />
      <CalcHeader />
      <Content>
        <CalcRoutesTop items={items} />
        <SubTitle value="Qual é o sistema de produção?" size={14} mb={20} />
        <ChooseItemButton
          size={47}
          content={'Bovinocultura\n de corte'}
          onPress={() => {
            navigation.navigate('ChooseBovineCategory', {
              calc,
              animalCategory: 'Bovinocultura de corte',
            });
          }}
        />
        <ChooseItemButton
          content={'Bovinocultura\n de leite'}
          size={47}
          onPress={() => {
            navigation.navigate('ChooseBovineCategory', {
              calc,
              animalCategory: 'Bovinocultura de leite',
            });
          }}
        />
      </Content>
    </Container>
  );
};

export default ChooseBovineType;
