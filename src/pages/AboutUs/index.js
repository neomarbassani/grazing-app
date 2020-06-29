/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import backgroundLogo from '../../assets/backgroundLogo.png';

import Container from '../../layout/App';
import logo from '../../assets/logoHorizontal.png';

import SubTitle from '../../components/SubTitle';
import CalcHeader from '../../components/CalcHeader';
import PlanInfoBox from '../../components/PlanInfoBox';

import {Content, Logo, Text} from './styles';

const AboutUs = ({navigation, route}) => {
  return (
    <Container
      source={backgroundLogo}
      imageStyle={{
        top: 0,
        height: '90%',
      }}>
      <Content>
        <PlanInfoBox />
        <Logo source={logo} />
        <SubTitle value="Sobre nós" size={14} mb={20} />
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum
        </Text>
      </Content>
    </Container>
  );
};

export default AboutUs;
