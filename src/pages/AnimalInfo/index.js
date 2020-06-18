import React, {useRef, useState} from 'react';
import * as Yup from 'yup';
import {Form} from '@unform/mobile';

import Container from '../../layout/App';

import SubTitle from '../../components/SubTitle';
import ProgressBar from '../../components/ProgressBar';
import CalcHeader from '../../components/CalcHeader';
import CalcRoutesTop from '../../components/CalcRoutesTop';
import Input from '../../components/Input';
import SliderInput from '../../components/SliderInput';
import Button from '../../components/Button';

import {Content} from './styles';

const ChooseBovineCategory = ({navigation, route}) => {
  const [score, setScore] = useState(0);
  const {calc, animal} = route.params;

  const items = [calc.name];

  const formRef = useRef(null);

  async function handleSubmit({weigth}) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        weigth: Yup.string().required('Insira o peso médio dos animais'),
      });

      await schema.validate(
        {weigth},
        {
          abortEarly: false,
        },
      );

      navigation.navigate('ChoosePastureType', {
        calc,
        animal,
        inputs: [
          {name: 'Peso médio', value: weigth, key: 'weigth'},
          {
            name: 'Escore de condição corporal',
            value: score.toString(),
            key: 'score',
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
    <Container>
      <ProgressBar size={62.5} />
      <CalcHeader />
      <Content>
        <CalcRoutesTop items={items} />
        <SubTitle value="Insira informações dos animais" size={14} mb={20} />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="weigth"
            label="Peso médio"
            keyboardType="numeric"
            placeholder="kg"
          />
          <SliderInput
            label="Escore de condição corporal"
            value={score}
            onValueChange={value => {
              setScore(value);
            }}
            minVal={0}
            maxVal={6}
          />
        </Form>
        <Button
          content="Próximo"
          mt={20}
          color="#D69D2B"
          onPress={() => formRef.current.submitForm()}
        />
      </Content>
    </Container>
  );
};

export default ChooseBovineCategory;
