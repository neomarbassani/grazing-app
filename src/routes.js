import React from 'react';

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
import ChooseBovineCategory from './pages/ChooseBovineCategory';
import AnimalInfo from './pages/AnimalInfo';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import ChoosePastureType from './pages/ChoosePastureType';
import Result from './pages/Result';
import Offline from './pages/Offline';
import ChooseGrazingMethod from './pages/ChooseGrazingMethod';

import DimensionArea from './pages/Forms/DimensionArea';

import TabBar from './components/TabBar';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './services/RootNavigation';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="Result" component={Result} />
      <Tab.Screen name="AboutUs" component={AboutUs} />
      <Tab.Screen name="Historico" component={Historic} />
      <Tab.Screen name="Perfil" component={Profile} />
      <Tab.Screen name="Contact" component={Contact} />
    </Tab.Navigator>
  );
};

const InicioStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ChooseGrazingMethod"
        component={ChooseGrazingMethod}
      />
      <Stack.Screen
        name="ChooseBovineCategory"
        component={ChooseBovineCategory}
      />
      <Stack.Screen name="ChooseBovineType" component={ChooseBovineType} />
      <Stack.Screen name="AnimalInfo" component={AnimalInfo} />
      <Stack.Screen name="ChoosePastureType" component={ChoosePastureType} />
      <Stack.Screen name="DimensionArea" component={DimensionArea} />
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
