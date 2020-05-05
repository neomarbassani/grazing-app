import React, { useState } from 'react';

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
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
        <Link content="Não recebi o código" color="#D69D2B" mt={15} />
      </ContentTop>

      <ContentBottom>
        <Button
          content="Entrar"
          onPress={() => {
            console.log(value);
          }}
        />
      </ContentBottom>
    </Container>
  );
}
