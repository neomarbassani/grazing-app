import React from 'react';
import {TouchableOpacity} from 'react-native';

/* import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs'; */
import Icon from 'react-native-vector-icons/Feather';

import Wellcome from './pages/Wellcome';
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
/* import Result from './pages/Result'; */
import Offline from './pages/Offline';
import HistoricItemDetails from './pages/HistoricItemDetails';

import SupplementSupplyQuantity from './pages/Forms/SupplementSupplyQuantity';

import Avatar from './components/Avatar';
import NavigationHeaderLogo from './components/NavigationHeaderLogo';
import TabBar from './components/TabBar';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './services/RootNavigation';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
  },
};

function InittialNavigationOptions({navigation}) {
  return {
    headerRight: () => (
      <Avatar action={() => navigation.navigate('Perfil')} size={38} mr={10} />
    ),
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

function HistoricNavigationOptions({navigation}) {
  return {
    headerRight: () => (
      <Avatar action={() => navigation.navigate('Perfil')} size={38} mr={10} />
    ),
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

function NavOpts({navigation}) {
  return {
    headerRight: () => (
      <Avatar action={() => navigation.navigate('Perfil')} size={38} mr={10} />
    ),
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

const WellcomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Wellcome" component={Wellcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="RecoveryPassword" component={RecoveryPassword} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Início" component={InicioStack} />
      <Tab.Screen name="Historico" component={HistoricStack} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
};

const InicioStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={InittialNavigationOptions}
      />
      <Stack.Screen
        name="ChooseBovineType"
        component={ChooseBovineType}
        options={NavOpts}
      />
      <Stack.Screen
        name="ChoosePastureType"
        component={ChoosePastureType}
        options={NavOpts}
      />
      <Stack.Screen
        name="SupplementSupplyQuantity"
        component={SupplementSupplyQuantity}
        options={NavOpts}
      />
    </Stack.Navigator>
  );
};

const HistoricStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Historic"
        component={Historic}
        options={HistoricNavigationOptions}
      />
      <Stack.Screen
        name="HistoricItemDetails"
        component={HistoricItemDetails}
        options={HistoricNavigationOptions}
      />
    </Stack.Navigator>
  );
};

export default function Routes({isConnected, signed, autenticated, linking}) {
  const initialRoute = () => {
    if (signed) {
      if (autenticated) {
        return <AppStack />;
      }
      return <PhoneConfirmation />;
    }
    return <WellcomeStack />;
  };

  const initialRouteConnected = () => {
    if (signed && autenticated) {
      return <AppStack />;
    }

    return <Offline />;
  };

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      {isConnected ? initialRoute() : initialRouteConnected()}
    </NavigationContainer>
  );
}
