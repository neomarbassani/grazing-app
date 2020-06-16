/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';

import AuthActions from '../../store/ducks/auth';

import {
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import Container from '../../layout/Auth';
import {Input, BoxCodeField, VerificationCodeArea, Label} from './styles';

import Title from '../../components/Title';
import LogoHeader from '../../components/LogoHeader';
import Link from '../../components/Link';
import Button from '../../components/Button';

const CELL_COUNT = 6;

export default function SignIn({navigation}) {
  const [confirm, setConfirm] = useState(null);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const phone = useSelector(state => state.auth.user.phone);

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(AuthActions.autenticationRequest());
        setLoading(false);
      } else {
        signInWithPhoneNumber(`+55${phone}`);
      }
    });
    return () => unsubscribe();
  }, [phone]);

  async function confirmCode() {
    try {
      setLoading(true);
      await confirm.confirm(value);
      dispatch(AuthActions.autenticationRequest());
      setLoading(false);
    } catch (error) {
      Alert.alert('Erro', 'Código Invalido');
      setLoading(false);
    }
  }

  return (
    <Container>
      <LogoHeader mt={50} mb={40} />
      <Title value="Confirmar acesso" size={14} mb={16} />

      <VerificationCodeArea>
        <Label>Código</Label>
        <BoxCodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          renderCell={({index, symbol, isFocused}) => (
            <Input key={index} onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Input>
          )}
        />
      </VerificationCodeArea>
      <Link content="Não recebi o código" disabled color="#D69D2B" mt={15} />

      <Button
        mt="auto"
        mb={16}
        content="Entrar"
        loading={loading}
        onPress={() => confirmCode()}
      />
    </Container>
  );
}
