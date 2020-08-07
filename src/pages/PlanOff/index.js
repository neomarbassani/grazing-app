/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useDispatch} from 'react-redux';

import AuthActions from '../../store/ducks/auth';

import {
  Logo,
  TextBox,
  TextBoxItem,
  TextBoxItemPrice,
  TextBoxItemText,
} from './styles';

import logo from '../../assets/logo_white.png';
import background from '../../assets/planoff.jpg';

import Container from '../../layout/App';

import Button from '../../components/Button';

const PlanOff = () => {
  const dispatch = useDispatch();
  return (
    <Container
      results
      source={background}
      resizeMethod="resize"
      resizeMode="cover">
      <Logo source={logo} />
      <TouchableOpacity
        onPress={() => dispatch(AuthActions.signOut())}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}>
        <Icon name="exit-to-app" size={30} color="#fff" />
      </TouchableOpacity>
      <TextBox>
        <TextBoxItem>
          <TextBoxItemText>
            Seu período de teste acabou 😢. Para continuar usando nosso
            aplicativo assine o plano a seguir.
          </TextBoxItemText>
        </TextBoxItem>
        <TextBoxItem color="#C94324">
          <TextBoxItemPrice>R$32,90</TextBoxItemPrice>
        </TextBoxItem>
      </TextBox>
      <Button content="Assine agora >" mt="20px" mb="16px" size="90%" />
    </Container>
  );
};

export default PlanOff;
