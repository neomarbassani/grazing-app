import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/SignIn';
import PhoneConfirmation from './pages/PhoneConfirmation';
import RecoveryPassword from './pages/RecoveryPassword';
import NewPassword from './pages/NewPassword';
import Register from './pages/Register';

export default () =>
  createAppContainer(
    createSwitchNavigator({
      SignIn: createSwitchNavigator({
        Login,
        NewPassword: {
          screen: NewPassword,
          path: 'new-password',
        },
        RecoveryPassword,
        PhoneConfirmation,
        Register,
      }),
    }),
  );
