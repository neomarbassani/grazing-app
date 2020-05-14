import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
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

import Avatar from './components/Avatar';
import NavigationHeaderLogo from './components/NavigationHeaderLogo';

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function navigationOpts({ navigation }) {
  return {
    headerRight: () => <Avatar size={38} mr={10} />,
    headerTitle: () => <NavigationHeaderLogo size={38} />,
    headerStyle: {
      backgroundColor: '#fff',
      elevation: 0,
      borderBottomWidth: 0,
      shadowOpacity: 0,
    },
    shownHeader: false,
    transitionSpec: {
      open: config,
      close: config,
    },
  };
}

const Auth = createSwitchNavigator({
  Login,
  NewPassword: {
    screen: NewPassword,
    path: 'new-password/:token',
  },
  RecoveryPassword,
  Register,
});

const App = createBottomTabNavigator(
  {
    Início: {
      screen: createStackNavigator({
        Home: {
          screen: Home,
          navigationOptions: navigationOpts,
        },
      }),
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
);

export default (signedIn, autenticated) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Auth: {
          screen: Auth,
          path: 'auth',
        },
        PhoneConfirmation,
        App: {
          screen: App,
          path: 'app',
        },
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
