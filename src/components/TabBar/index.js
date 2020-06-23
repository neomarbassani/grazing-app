import React from 'react';

import {Container, Home, Icon, Page} from './styles';

import aboutUs from '../../assets/aboutUs.png';
import history from '../../assets/history.png';
import home from '../../assets/home.png';
import profile from '../../assets/profile.png';
import sendMessage from '../../assets/sendMessage.png';

const TabBar = ({state, navigation}) => {
  return (
    <>
      {state.routes[state.index].name === 'Result' ||
      state.routes[state.index].name === 'PlanOff' ? null : (
        <Container resizeMode="cover">
          <Page onPress={() => navigation.navigate('AboutUs')}>
            <Icon
              source={aboutUs}
              resizeMode="contain"
              focused={state.routeNames[state.index] === 'AboutUs'}
            />
          </Page>
          <Page onPress={() => navigation.navigate('Historico')}>
            <Icon
              source={history}
              resizeMode="contain"
              focused={state.routeNames[state.index] === 'Historico'}
            />
          </Page>
          <Home onPress={() => navigation.navigate('Início')}>
            <Icon
              source={home}
              resizeMode="contain"
              focused={state.routeNames[state.index] === 'Início'}
            />
          </Home>
          <Page onPress={() => navigation.navigate('Contact')}>
            <Icon
              source={sendMessage}
              resizeMode="contain"
              focused={state.routeNames[state.index] === 'Contact'}
            />
          </Page>
          <Page onPress={() => navigation.navigate('Perfil')}>
            <Icon
              source={profile}
              resizeMode="contain"
              focused={state.routeNames[state.index] === 'Perfil'}
            />
          </Page>
        </Container>
      )}
    </>
  );
};

export default TabBar;
