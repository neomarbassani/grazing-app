/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import Container from '../../layout/App';

import SubTitle from '../../components/SubTitle';
import ChooseItemButton from '../../components/ChooseItemButton';
import ProgressBar from '../../components/ProgressBar';
import CalcHeader from '../../components/CalcHeader';

import backgroundLogo from '../../assets/backgroundLogo.png';

import grazingmethod1 from '../../assets/grazingmethod1.jpg';
import grazingmethod2 from '../../assets/grazingmethod2.jpg';

import {Content} from './styles';
import {ContentScroll} from '../ChooseBovineType/styles';

const ChooseGrazingMethod = ({navigation, route}) => {
  const {calcName} = route.params;

  return (
    <Container
      source={backgroundLogo}
      imageStyle={{
        top: 0,
        height: '80%',
      }}>
      <ProgressBar size={25} />
      <CalcHeader />
      <ContentScroll>
        <Content>
          <SubTitle
            value="Qual método de pastoreio você utiliza?"
            size={14}
            mb={20}
          />
          {calcName !== 'Calcular números de piquetes' &&
            calcName !== 'Definir período de ocupação' && (
              <ChooseItemButton
                size={47}
                source={grazingmethod1}
                content="Contínuo"
                onPress={() => {
                  navigation.navigate('ChooseBovineType', {
                    calc: {
                      name: 'Pastoreio contínuo',
                      value: calcName,
                    },
                  });
                }}
              />
            )}
          <ChooseItemButton
            content="Rotativo"
            source={grazingmethod2}
            size={47}
            onPress={() => {
              navigation.navigate('ChooseBovineType', {
                calc: {
                  name: 'Pastoreio rotativo',
                  value: calcName,
                },
              });
            }}
          />
        </Content>
      </ContentScroll>
    </Container>
  );
};

export default ChooseGrazingMethod;
