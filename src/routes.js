import React from 'react';
import { TouchableOpacity } from 'react-native';

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
import ChooseBovineType from './pages/ChooseBovineType';
import ChoosePastureType from './pages/ChoosePastureType';
import Result from './pages/Result';
import Offline from './pages/Offline';

import SupplementSupplyQuantity from './pages/Forms/SupplementSupplyQuantity';

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

function InittialNavigationOptions({ navigation }) {
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

function NavOpts({ navigation }) {
  return {
    headerRight: () => <Avatar size={38} mr={10} />,
    headerBackImage: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon size={26} name="arrow-left" />
      </TouchableOpacity>
    ),
    headerTitle: () => null,
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

function NavOptsHistory({ navigation }) {
  return {
    headerRight: () => <Avatar size={38} mr={10} />,
    headerBackImage: () => null,
    headerTitle: () => null,
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
          navigationOptions: InittialNavigationOptions,
        },
        ChooseBovineType: {
          screen: ChooseBovineType,
          navigationOptions: NavOpts,
        },
        ChoosePastureType: {
          screen: ChoosePastureType,
          navigationOptions: NavOpts,
        },
        SupplementSupplyQuantity: {
          screen: SupplementSupplyQuantity,
          navigationOptions: NavOpts,
        },
      }),
    },
    Histórico: {
      screen: createStackNavigator({
        Historic: {
          screen: Historic,
          navigationOptions: NavOptsHistory,
        },
      }),
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

export default (signedIn, autenticated, isConnected) => {
  const initialRoute = () => {
    if (isConnected) {
      if (signedIn) {
        if (autenticated) {
          return 'App';
        }
        return 'PhoneConfirmation';
      }
      return 'Auth';
    }

    if (signedIn && autenticated) {
      return 'App';
    }

    return 'Offline';
  };

  return createAppContainer(
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
        Result,
        Offline,
      },
      {
        initialRouteName: initialRoute(),
      },
    ),
  );
};
