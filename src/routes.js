import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/SignIn';
import PhoneConfirmation from './pages/PhoneConfirmation';
import RecoveryPassword from './pages/RecoveryPassword';
import NewPassword from './pages/NewPassword';
import Register from './pages/Register';
import Home from './pages/Home';

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
        App: createSwitchNavigator({
          Home,
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
