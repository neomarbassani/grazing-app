import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalcActions from '../../store/ducks/calc';

import Container from '../../layout/App/Container';

import Title from '../../components/Title';
import SubTitle from '../../components/SubTitle';
import ChooseItemButton from '../../components/ChooseItemButton';
import FreePlanBox from '../../components/FreePlanBox';

import { Content, ContentToSelect } from './styles';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const historic = useSelector((state) => state.calcHistory);

  console.log(historic);

  return (
    <Container>
      <Title size={24} value="Realizar novo cálculo" />
      <Content>
        <SubTitle value="Pastoreio rotativo" size={16} />
        <ContentToSelect>
          <ChooseItemButton
            content="Número de animais no sistema"
            onPress={() => {
              navigation.navigate('ChooseBovineType');

              dispatch(
                CalcActions.setCalcConfig({
                  name: 'Pastoreio rotativo',
                  value: 'Número de animais no sistema',
                }),
              );
            }}
          />
          <ChooseItemButton
            content="Número de dias dos animais nas faixas"
            onPress={() => {
              navigation.navigate('ChooseBovineType');

              dispatch(
                CalcActions.setCalcConfig({
                  name: 'Pastoreio rotativo',
                  value: 'Número de dias dos animais nas faixas',
                }),
              );
            }}
          />
          <ChooseItemButton
            content="Número total de faixas"
            onPress={() => {
              navigation.navigate('ChooseBovineType');

              dispatch(
                CalcActions.setCalcConfig({
                  name: 'Pastoreio rotativo',
                  value: 'Número total de faixas',
                }),
              );
            }}
          />
          <ChooseItemButton
            content="Quantidade de ração"
            onPress={() => {
              navigation.navigate('ChooseBovineType');

              dispatch(
                CalcActions.setCalcConfig({
                  name: 'Pastoreio rotativo',
                  value: 'Quantidade de ração',
                }),
              );
            }}
          />
          <ChooseItemButton
            content="Área do potreiro"
            onPress={() => {
              navigation.navigate('ChooseBovineType');

              dispatch(
                CalcActions.setCalcConfig({
                  name: 'Pastoreio rotativo',
                  value: 'Área do potreiro',
                }),
              );
            }}
          />
        </ContentToSelect>
        <SubTitle value="Pastoreio continuo" size={16} />
        <ContentToSelect>
          <ChooseItemButton
            content="Dimensionar tamanho do potreiro"
            onPress={() => {
              navigation.navigate('ChooseBovineType');

              dispatch(
                CalcActions.setCalcConfig({
                  name: 'Pastoreio continuo',
                  value: 'Dimensionar tamanho do potreiro',
                }),
              );
            }}
          />
          <ChooseItemButton
            content="Quantidade de suplemento"
            onPress={() => {
              navigation.navigate('ChooseBovineType');

              dispatch(
                CalcActions.setCalcConfig({
                  name: 'Pastoreio continuo',
                  value: 'Quantidade de suplemento',
                }),
              );
            }}
          />
          <ChooseItemButton
            content="Ajustar locatação"
            onPress={() => {
              navigation.navigate('ChooseBovineType');

              dispatch(
                CalcActions.setCalcConfig({
                  name: 'Pastoreio continuo',
                  value: 'Ajustar locatação',
                }),
              );
            }}
          />
        </ContentToSelect>
      </Content>
      <FreePlanBox />
    </Container>
  );
};

export default Home;
