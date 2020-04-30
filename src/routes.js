import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/SignIn';

export default () =>
  createAppContainer(
    createSwitchNavigator({
      SignIn: createSwitchNavigator({
        Login,
      }),
    }),
  );
