/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useDispatch} from 'react-redux';
import CalcActions from '../../store/ducks/calc';

import Container from '../../layout/App';

import Title from '../../components/Title';
import ChooseItemButton from '../../components/ChooseItemButton';
import ProgressBar from '../../components/ProgressBar';
import Link from '../../components/Link';

import {Content, FreePlanBox, FreePlanBoxText} from './styles';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <ProgressBar size={12.5} />
        <Title size={19} mb={10} value="Soluções Grazing" />
        <Content
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 30,
            paddingRight: 30,
            paddingBottom: 35,
          }}>
          <ChooseItemButton
            content="Ajustar lotação animal"
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
            content="Dimensionar área do potreiro"
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
            content="Fornecer suplemento"
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
            content="Calcular números de piquetes"
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
            content="Definir período de ocupação"
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
          <FreePlanBox>
            <FreePlanBoxText>Você tem 30 dias grátis</FreePlanBoxText>
            <Link content="Assinar plano agora" color="#D69D2B" />
          </FreePlanBox>
        </Content>
      </Container>
    </>
  );
};

export default Home;
