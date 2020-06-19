/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import Container from '../../layout/App';

import SubTitle from '../../components/SubTitle';
import ChooseItemButton from '../../components/ChooseItemButton';
import ProgressBar from '../../components/ProgressBar';
import CalcHeader from '../../components/CalcHeader';
import backgroundLogo from '../../assets/backgroundLogo.png';

import {Content} from './styles';

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
      <Content>
        <SubTitle
          value="Qual método de pastoreio você utiliza?"
          size={14}
          mb={20}
        />
        <ChooseItemButton
          size={47}
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
        <ChooseItemButton
          content="Rotativo"
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
    </Container>
  );
};

export default ChooseGrazingMethod;
