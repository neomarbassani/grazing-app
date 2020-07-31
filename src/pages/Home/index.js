/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import Container from '../../layout/App';

import Title from '../../components/Title';
import ChooseItemButton from '../../components/ChooseItemButton';
import HelpButton from '../../components/HelpButton';

import ProgressBar from '../../components/ProgressBar';
import Link from '../../components/Link';
import backgroundLogo from '../../assets/backgroundLogo.png';

import solution1 from '../../assets/solution1.jpg';
import solution2 from '../../assets/solution2.jpg';
import solution3 from '../../assets/solution3.jpg';
import solution4 from '../../assets/solution4.jpg';
import solution5 from '../../assets/solution5.jpg';

import {Content, FreePlanBox, FreePlanBoxText} from './styles';

import help from './data';

const Home = ({navigation}) => {
  return (
    <>
      <Container
        source={backgroundLogo}
        imageStyle={{
          top: 0,
          height: '80%',
        }}>
        <ProgressBar size={12.5} />
        <Title size={19} mb={10} value="Soluções Grazing" />
        <Content
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 35,
          }}>
          <ChooseItemButton
            content="Ajustar lotação animal"
            source={solution1}
            onPress={() => {
              navigation.navigate('ChooseGrazingMethod', {
                calcName: 'Ajustar lotação animal',
              });
            }}>
            <HelpButton card data={help[0]} />
          </ChooseItemButton>
          <ChooseItemButton
            content="Dimensionar área do potreiro"
            source={solution2}
            onPress={() => {
              navigation.navigate('ChooseGrazingMethod', {
                calcName: 'Dimensionar área do potreiro',
              });
            }}>
            <HelpButton card data={help[1]} />
          </ChooseItemButton>
          <ChooseItemButton
            content="Fornecer suplemento"
            source={solution3}
            onPress={() => {
              navigation.navigate('ChooseGrazingMethod', {
                calcName: 'Fornecer suplemento',
              });
            }}>
            <HelpButton card data={help[2]} />
          </ChooseItemButton>
          <ChooseItemButton
            content="Calcular números de piquetes"
            source={solution4}
            onPress={() => {
              navigation.navigate('ChoosePastureType', {
                calc: {
                  name: 'Pastoreio contínuo',
                  value: 'Calcular números de piquetes',
                },
              });
            }}>
            <HelpButton card data={help[3]} />
          </ChooseItemButton>
          <ChooseItemButton
            content="Definir período de ocupação"
            source={solution5}
            onPress={() => {
              navigation.navigate('ChooseGrazingMethod', {
                calcName: 'Definir período de ocupação',
              });
            }}>
            <HelpButton card data={help[4]} />
          </ChooseItemButton>
          <FreePlanBox>
            <FreePlanBoxText>Você tem 30 dias grátis</FreePlanBoxText>
            <Link
              content="Assinar plano agora"
              color="#D69D2B"
              onPress={() => navigation.navigate('PlanOff')}
            />
          </FreePlanBox>
        </Content>
      </Container>
    </>
  );
};

export default Home;
