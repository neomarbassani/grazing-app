import React, { useRef } from 'react';
import { Form } from '@unform/core';
import * as Yup from 'yup';

import Container from '../../../layout/App/Container';

import Title from '../../../components/Title';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import MaskedInput from '../../../components/MaskedInput';

const SupplementSupplyQuantity = ({ navigation }) => {
  const title = navigation.state.params;
  const formRef = useRef(null);

  async function handleSubmit(calcData) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        start_date: Yup.string().required('Insira uma data de início'),
        animals_quantity: Yup.number().required(
          'Insira a quantidade de animais',
        ),
        weigth: Yup.number().required('Insira o peso médio dos animais'),
        grazing_height: Yup.number().required('Insira a altura do pasto'),
        number_of_tracks: Yup.number().required(
          'Insira a quantidade de faixas',
        ),
        days_of_stay: Yup.number().required(
          'Insira quantos dias de permanencia',
        ),
      });

      await schema.validate(calcData, {
        abortEarly: false,
      });

      console.log(calcData);
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }
  return (
    <Container>
      <Title value={title} size={24} mb={20} />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <MaskedInput
          name="start_date"
          label="Início do pastoreio"
          placeholder="20/10/2020"
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
        />
        <Input
          keyboardType="number-pad"
          name="animals_quantity"
          label="Número de animais"
          placeholder="Digite o numero de animais"
        />
        <Input
          keyboardType="number-pad"
          name="weigth"
          label="Peso medio dos animais"
          placeholder="Digite o peso médio dos animais em kilogramas"
        />
        <Input
          keyboardType="number-pad"
          name="grazing_height"
          label="Altura da pastagem"
          placeholder="Digite a altura da pastagem em centimetros"
        />
        <Input
          keyboardType="number-pad"
          name="number_of_tracks"
          label="Numero de faixas"
          placeholder="Digite o numero de faixas"
        />
        <Input
          keyboardType="number-pad"
          name="days_of_stay"
          label="Dias de permanecias"
          placeholder="Digite a qunatidade de dias de permanencia"
        />
      </Form>
      <Button content="Calcular" onPress={() => formRef.current.submitForm()} />
    </Container>
  );
};

export default SupplementSupplyQuantity;
