import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/SignIn';
import PhoneConfirmation from './pages/PhoneConfirmation';
import RecoveryPassword from './pages/RecoveryPassword';
import NewPassword from './pages/NewPassword';

export default () =>
  createAppContainer(
    createSwitchNavigator({
      SignIn: createSwitchNavigator({
        Login,
        PhoneConfirmation,
        RecoveryPassword,
        NewPassword,
      }),
    }),
  );
