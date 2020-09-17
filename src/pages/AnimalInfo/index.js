// REVISAR

/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import * as Yup from 'yup';
import {Form} from '@unform/mobile';
import backgroundLogo from '../../assets/backgroundLogo.png';

import Container from '../../layout/App';

import SubTitle from '../../components/SubTitle';
import ProgressBar from '../../components/ProgressBar';
import CalcHeader from '../../components/CalcHeader';
import CalcRoutesTop from '../../components/CalcRoutesTop';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SliderInput from '../../components/SliderInput';
import HelpButton from '../../components/HelpButton';

import {Content} from './styles';

import help from './data';
import ModalInput from '../../components/ModalInput';

const AnimalInfo = ({navigation, route}) => {
  const [score, setScore] = useState(0);

  const {calc, animal} = route.params;

  const items = [
    calc.value,
    calc.name,
    animal && animal.name,
    animal && animal.value,
  ];

  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      let schema;

      if (animal.name === 'bovinoCorte') {
        schema = Yup.object().shape({
          peso: Yup.string().required('Insira o peso médio dos animais'),
        });
      }

      if (animal.name === 'bovinoLeite' && animal.value === 'vacaLactacao') {
        schema = Yup.object().shape({
          peso: Yup.string().required('Insira o peso médio dos animais'),
          semanasDeLactacao: Yup.string().required(
            'Insira o número de semanas em lactação',
          ),
          quantidadeDeLeite: Yup.string().required(
            'Insira a quantidade de leite',
          ),
        });
      }

      if (animal.name === 'bovinoLeite' && animal.value === 'novilhaLeite') {
        schema = Yup.object().shape({
          peso: Yup.string().required('Insira o peso médio dos animais'),
          diasDeGestacao: Yup.string().required(
            'Insira o número de dias de gestação',
          ),
        });
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      navigation.navigate('ChoosePastureType', {
        calc,
        animal,
        inputs: [
          {name: 'Peso médio', value: data.peso, key: 'peso'},
          {
            name: 'Semanas de Lactação',
            value: data.semanasDeLactacao || 0,
            key: 'semanasDeLactacao',
          },
          {
            name: 'Produção de Leite (litros/dia)',
            value: data.quantidadeDeLeite || 0,
            key: 'quantidadeDeLeite',
          },
          {
            name: 'N° de dias de gestação',
            value: data.diasDeGestacao || 0,
            key: 'diasDeGestacao',
          },
        ],
      });
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

  return (
    <Container
      source={backgroundLogo}
      imageStyle={{
        top: 0,
        height: '80%',
      }}>
      <ProgressBar size={62.5} />
      <CalcHeader />
      <Content>
        <CalcRoutesTop items={items} />
        <SubTitle value="Insira informações dos animais" size={14} mb={20} />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="peso"
            label="Peso vivo médio dos animais"
            keyboardType="numeric"
            placeholder="(kg PV)">
            <HelpButton data={help.peso} />
          </Input>

          <ModalInput
            name="Escore de condição corporal"
            minValue={0}
            maxValue={5}
            value={score}
            onChange={setScore}>
            <SliderInput
              label="Escore de condição corporal"
              value={parseFloat(score)}
              color="#888899"
              step={0.5}
              mt={10}
              onValueChange={value => setScore(value)}
              minVal={0}
              maxVal={5}>
              <HelpButton data={help.escore} />
            </SliderInput>
          </ModalInput>

          {animal.value === 'vacaLactacao' && (
            <>
              <Input
                name="semanasDeLactacao"
                label="Semanas de Lactação"
                keyboardType="numeric"
                placeholder="10 semanas">
                <HelpButton data={help.semanasLactacao} />
              </Input>
              <Input
                name="quantidadeDeLeite"
                label="Produção de Leite (litros/dia)"
                keyboardType="numeric"
                placeholder="10 (litros/dia)">
                <HelpButton data={help.prodLeite} />
              </Input>
            </>
          )}
          {animal.value === 'novilhaLeite' && (
            <Input
              name="diasDeGestacao"
              label="N° de dias de gestação"
              keyboardType="numeric"
              placeholder="10">
              <HelpButton data={help.diasGestacao} />
            </Input>
          )}
        </Form>
        <Button
          content="Próximo"
          mt="20px"
          mb="30px"
          color="#D69D2B"
          onPress={() => formRef.current.submitForm()}
          disabled={score === 0}
        />
      </Content>
    </Container>
  );
};

export default AnimalInfo;
