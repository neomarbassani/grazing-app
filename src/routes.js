import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
        App: createBottomTabNavigator({
          Home,
          Historic,
          Profile,
        }),
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
