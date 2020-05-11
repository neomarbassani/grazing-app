import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Feather';

import Login from './pages/SignIn';
import PhoneConfirmation from './pages/PhoneConfirmation';
import RecoveryPassword from './pages/RecoveryPassword';
import NewPassword from './pages/NewPassword';
import Register from './pages/Register';
import Home from './pages/Home';
import Historic from './pages/Historic';
import Profile from './pages/Profile';

export default (signedIn, autenticated) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Auth: createSwitchNavigator({
          Login,
          NewPassword,
          RecoveryPassword,
          Register,
        }),
        PhoneConfirmation,
        App: createBottomTabNavigator(
          {
            Início: {
              screen: Home,
            },
            Histórico: {
              screen: Historic,
            },
            Perfil: {
              screen: Profile,
            },
          },
          {
            defaultNavigationOptions: ({ navigation }) => ({
              tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;

                let iconName;

                if (routeName === 'Início') {
                  iconName = 'home';
                } else if (routeName === 'Histórico') {
                  iconName = 'file-text';
                } else if (routeName === 'Perfil') {
                  iconName = 'user';
                }

                return <Icon name={iconName} size={25} color={tintColor} />;
              },
            }),
            tabBarOptions: {
              activeTintColor: '#D09776',
              inactiveTintColor: '#fff',
              style: {
                backgroundColor: '#281100',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderTopWidth: 0,
              },
              labelStyle: {
                fontFamily: 'Ubuntu',
                fontSize: 12,
                fontWeight: 'bold',
                alignItems: 'center',
                marginTop: 'auto',
                marginBottom: 'auto',
              },
              keyboardHidesTabBar: true,
              labelPosition: 'beside-icon',
              showIcon: true,
            },
          },
        ),
      },
      {
        initialRouteName: signedIn
          ? autenticated
            ? 'App'
            : 'PhoneConfirmation'
          : 'Auth',
      },
    ),
  );
