import React, {useRef, useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {Form} from '@unform/core';
import * as Yup from 'yup';

import CalcActions from '../../../store/ducks/calc';

import Container from '../../../layout/App';

import Title from '../../../components/Title';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import CalcRoutesTop from '../../../components/CalcRoutesTop';

import {supplementQuantityCalc} from '../../../services/calcs';

const SupplementSupplyQuantity = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const title = useSelector(state => state.calc.calc.value);
  const RouteCalcLabel = useSelector(state => state.calc.calc.name);
  const RouteAnimalLabel = useSelector(state => state.calc.animal.value);
  const RoutePastureLabel = useSelector(state => state.calc.pasture.value);

  const formRef = useRef(null);
  const dispatch = useDispatch();

  const items = [RouteCalcLabel, RouteAnimalLabel, RoutePastureLabel];

  async function handleSubmit(calcData) {
    setLoading(true);
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        start_date: Yup.date('Insira uma data válida').required(
          'Insira uma data de início',
        ),
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

      dispatch(
        CalcActions.setInputs([
          {
            key: 'start_date',
            name: 'Início do pastoreio',
            value: calcData.start_date,
          },
          {
            key: 'animals_quantity',
            name: 'Número de animais',
            value: calcData.animals_quantity,
          },
          {
            key: 'weigth',
            name: 'Peso medio dos animais',
            value: calcData.weigth,
          },
          {
            key: 'grazing_height',
            name: 'Altura da pastagem',
            value: calcData.grazing_height,
          },
          {
            key: 'number_of_tracks',
            name: 'Numero de faixas',
            value: calcData.number_of_tracks,
          },
          {
            key: 'days_of_stay',
            name: 'Dias de permanecias',
            value: calcData.days_of_stay,
          },
        ]),
      );

      const results = supplementQuantityCalc(calcData);

      dispatch(CalcActions.setResults([results]));

      navigation.navigate('Result');
      setLoading(false);
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }

      setLoading(false);
    }
  }

  function focusInput(field) {
    const focusInputField = formRef.current.getFieldRef(field);

    if (typeof focusInputField.focus === 'function') {
      focusInputField.focus();
    } else {
      focusInputField.getElement().focus();
    }
  }
  return (
    <Container>
      <Title value={title} size={24} />
      <CalcRoutesTop items={items} />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="start_date"
          label="Início do pastoreio"
          placeholder="20/10/2020"
          maskedType={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
          onSubmitEditing={() => focusInput('animals_quantity')}
          returnKeyType="next"
        />
        <Input
          keyboardType="number-pad"
          name="animals_quantity"
          label="Número de animais"
          placeholder="Digite o numero de animais"
          onSubmitEditing={() => focusInput('weigth')}
          returnKeyType="next"
        />
        <Input
          keyboardType="number-pad"
          name="weigth"
          label="Peso medio dos animais"
          placeholder="Digite o peso médio dos animais em kg"
          onSubmitEditing={() => focusInput('grazing_height')}
          returnKeyType="next"
        />
        <Input
          keyboardType="number-pad"
          name="grazing_height"
          label="Altura da pastagem"
          placeholder="Digite a altura da pastagem em cm"
          onSubmitEditing={() => focusInput('number_of_tracks')}
          returnKeyType="next"
        />
        <Input
          keyboardType="number-pad"
          name="number_of_tracks"
          label="Numero de faixas"
          placeholder="Digite o numero de faixas"
          onSubmitEditing={() => focusInput('days_of_stay')}
          returnKeyType="next"
        />
        <Input
          keyboardType="number-pad"
          name="days_of_stay"
          label="Dias de permanecias"
          placeholder="Digite a quantidade de dias de permanencia"
          returnKeyType="done"
        />
      </Form>
      <Button
        content="Calcular"
        onPress={() => formRef.current.submitForm()}
        loading={loading}
      />
    </Container>
  );
};

export default SupplementSupplyQuantity;
