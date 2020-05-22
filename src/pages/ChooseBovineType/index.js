import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CalcActions from '../../store/ducks/calc';
import Container from '../../layout/App/Container';

import Title from '../../components/Title';
import SubTitle from '../../components/SubTitle';
import ChooseItemButton from '../../components/ChooseItemButton';
import CalcRoutesTop from '../../components/CalcRoutesTop';

import { Content, ContentToSelect } from './styles';

const ChoosePastureType = ({ navigation }) => {
  const TitleOfPage = useSelector((state) => state.calc.calc.value);
  const RouteCalcLabel = useSelector((state) => state.calc.calc.name);

  const dispatch = useDispatch();

  const items = [RouteCalcLabel];

  return (
    <Container>
      <Title size={24} value={TitleOfPage} />
      <CalcRoutesTop items={items} />
      <Content>
        <SubTitle value="Bovino de leite" size={16} />
        <ContentToSelect>
          <ChooseItemButton
            content="Novilha"
            onPress={() => {
              navigation.navigate('ChoosePastureType');

              dispatch(
                CalcActions.setAnimalConfig({
                  name: 'Bovino de leite',
                  value: 'Novilha',
                }),
              );
            }}
          />
          <ChooseItemButton
            content="Vaca em lactação"
            onPress={() => {
              navigation.navigate('ChoosePastureType');

              dispatch(
                CalcActions.setAnimalConfig({
                  name: 'Bovino de leite',
                  value: 'Vaca em lactação',
                }),
              );
            }}
          />
        </ContentToSelect>
        <SubTitle value="Bovino de corte" size={16} />
        <ContentToSelect>
          <ChooseItemButton
            content="Terneiro"
            onPress={() => {
              navigation.navigate('ChoosePastureType');

              dispatch(
                CalcActions.setAnimalConfig({
                  name: 'Bovino de corte',
                  value: 'Terneiro',
                }),
              );
            }}
          />
          <ChooseItemButton
            content="Novilho"
            onPress={() => {
              navigation.navigate('ChoosePastureType');

              dispatch(
                CalcActions.setAnimalConfig({
                  name: 'Bovino de corte',
                  value: 'Novilho',
                }),
              );
            }}
          />
        </ContentToSelect>
      </Content>
    </Container>
  );
};

export default ChoosePastureType;
