import React, {useRef, useState} from 'react';
import * as Yup from 'yup';
import {Form} from '@unform/mobile';
import {useDispatch} from 'react-redux';

import Container from '../../../layout/App';

import SubTitle from '../../../components/SubTitle';
import ProgressBar from '../../../components/ProgressBar';
import CalcHeader from '../../../components/CalcHeader';
import CalcRoutesTop from '../../../components/CalcRoutesTop';
import Input from '../../../components/Input';
import SliderInput from '../../../components/SliderInput';
import Button from '../../../components/Button';

import {Content} from './styles';

import {areaOfFoal} from '../../../services/calcs';
import backgroundImage from '../../../assets/background-form-azevem.png';

const DimensionArea = ({navigation, route}) => {
  const [pastureHeight, setPastureHeight] = useState(0);
  const {calc, animal, pasture, inputs} = route.params;

  const dispatch = useDispatch();

  const items = [calc.name];

  const formRef = useRef(null);

  async function handleSubmit({evaluation_date, foal_name, days_of_use}) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        foal_name: Yup.string().required('Insira o nome do potreiro.'),
        evaluation_date: Yup.date('Insira uma data válida').required(
          'Insira a data da avaliação.',
        ),
        days_of_use: Yup.string().required('Insira os dias de utilização.'),
      });

      await schema.validate(
        {evaluation_date, foal_name, days_of_use},
        {
          abortEarly: false,
        },
      );

      const results = areaOfFoal({
        weigth: inputs.find(input => input.key === 'weigth').value,
        score: inputs.find(input => input.key === 'score').value,
        days_of_use,
        pastureHeight,
      });

      const calcState = {
        config: {
          calc,
          animal,
          pasture,
        },
        inputs: [
          ...inputs,
          {
            name: 'Nome do Potreiro',
            value: foal_name,
            key: 'foal_name',
          },
          {
            name: 'Data de avaliação',
            value: evaluation_date,
            key: 'evaluation_date',
          },
          {
            name: 'Dias de utilização',
            value: days_of_use,
            key: 'days_of_use',
          },
          {
            name: 'Altura do pasto (cm)',
            value: pastureHeight,
            key: 'pastureHeight',
          },
        ],
        results,
      };

      navigation.navigate('Result', calcState);
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
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
    <Container source={backgroundImage} resizeMode="cover">
      <ProgressBar size={87.5} />
      <CalcHeader color="#fff" />
      <Content>
        <CalcRoutesTop items={items} color="#fff" />
        <SubTitle
          value="Informações sobre o sistema"
          size={14}
          mb={20}
          color="#fff"
        />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="foal_name"
            label="Nome do Potreiro"
            color="#fff"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => focusInput('evaluation_date')}
          />
          <Input
            name="evaluation_date"
            color="#fff"
            label="Data da avaliação"
            keyboardType="numeric"
            placeholder="DD/MM/YYYY"
            maskType="datetime"
            options={{
              format: 'DD/MM/YYYY',
            }}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => focusInput('days_of_use')}
          />
          <Input
            name="days_of_use"
            label="Dias de utilização"
            color="#fff"
            keyboardType="numeric"
            placeholder="1"
            returnKeyType="next"
            blurOnSubmit={true}
          />
          <SliderInput
            label="Altura do pasto (cm)"
            value={pastureHeight}
            color="#fff"
            mt={10}
            onValueChange={value => {
              setPastureHeight(value);
            }}
            minVal={0}
            maxVal={30}
          />
        </Form>
        <Button
          content="Finalizar"
          mt={20}
          color="#D69D2B"
          onPress={() => formRef.current.submitForm()}
        />
      </Content>
    </Container>
  );
};

export default DimensionArea;
