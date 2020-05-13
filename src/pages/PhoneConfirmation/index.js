import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

import AuthActions from '../../store/ducks/auth';

import {
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { Container, ContentBottom, ContentTop } from '../../layout/Auth';
import { Input, BoxCodeField, VerificationCodeArea } from './styles';

import Title from '../../components/Title';
import LogoHeader from '../../components/LogoHeader';
import Link from '../../components/Link';
import Button from '../../components/Button';
import Label from '../../components/Label';

const CELL_COUNT = 6;

export default function SignIn({ navigation }) {
  const [confirm, setConfirm] = useState(null);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const phone = useSelector((state) => state.auth.user.phone);
  const loading = useSelector((state) => state.auth.loading);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  useEffect(() => {
    signInWithPhoneNumber(`+55${phone}`);
  }, [phone]);

  async function confirmCode() {
    try {
      await confirm.confirm(value);
      dispatch(AuthActions.autenticationRequest());
    } catch (error) {
      Alert.alert('Erro', 'Código Invalido');
    }
  }

  return (
    <Container>
      <ContentTop>
        <LogoHeader />
        <Title value="Confirmar acesso" size={24} mb={16} />

        <VerificationCodeArea>
          <Label>Código</Label>
          <BoxCodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            renderCell={({ index, symbol, isFocused }) => (
              <Input key={index} onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Input>
            )}
          />
        </VerificationCodeArea>
        <Link content="Não recebi o código" disabled color="#D69D2B" mt={15} />
      </ContentTop>

      <ContentBottom>
        <Button
          content="Entrar"
          loading={loading}
          onPress={() => confirmCode()}
        />
      </ContentBottom>
    </Container>
  );
}
