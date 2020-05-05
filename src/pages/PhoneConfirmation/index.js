import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

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
  const [code, setCode] = useState('');

  const ref = useBlurOnFulfill({ code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  useEffect(() => {
    signInWithPhoneNumber('+5538999459885');
  }, []);

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      navigation.navigate('Login');
    } catch (error) {
      console.log('Invalid code.');
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
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            renderCell={({ index, symbol, isFocused }) => (
              <Input key={index} onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Input>
            )}
          />
        </VerificationCodeArea>
        <Link content="Não recebi o código" color="#D69D2B" mt={15} />
      </ContentTop>

      <ContentBottom>
        <Button content="Entrar" onPress={() => confirmCode()} />
      </ContentBottom>
    </Container>
  );
}
