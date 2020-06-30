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
import SliderInput from '../../components/SliderInput';
import Button from '../../components/Button';

import {Content} from './styles';

const AnimalInfo = ({navigation, route}) => {
  const [score, setScore] = useState(0);
  const {calc, animal} = route.params;

  const items = [calc.name, animal.value];

  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      if (
        calc.name === 'Pastoreio rotativo' &&
        calc.value === 'Ajustar lotação animal' &&
        animal.value === 'Vaca em lactação'
      ) {
        const schema = Yup.object().shape({
          weigth: Yup.string().required('Insira o peso médio dos animais'),
          weeksOfLactation: Yup.string().required(
            'Insira o numero de semanas em lactação',
          ),
          milkQuantity: Yup.string().required('Insira a quantidade de leite'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        navigation.navigate('ChoosePastureType', {
          calc,
          animal,
          inputs: [
            {name: 'Peso médio', value: data.weigth, key: 'weigth'},
            {
              name: 'Semanas de Lactação',
              value: data.weeksOfLactation,
              key: 'weeksOfLactation',
            },
            {
              name: 'Produção de Leite (litros/dia)',
              value: data.milkQuantity,
              key: 'milkQuantity',
            },
          ],
        });
      }

      if (
        calc.name === 'Pastoreio rotativo' &&
        calc.value === 'Ajustar lotação animal' &&
        animal.value === 'Novilha Leiteira'
      ) {
        const schema = Yup.object().shape({
          weigth: Yup.string().required('Insira o peso médio dos animais'),
          daysOfLactation: Yup.string().required(
            'Insira o número de dias em lactação',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        navigation.navigate('ChoosePastureType', {
          calc,
          animal,
          inputs: [
            {name: 'Peso médio', value: data.weigth, key: 'weigth'},
            {
              name: 'N° de dias de gestação',
              value: data.daysOfLactation,
              key: 'daysOfLactation',
            },
          ],
        });
      }

      if (calc.value === 'Dimensionar área do potreiro') {
        const schema = Yup.object().shape({
          weigth: Yup.string().required('Insira o peso médio dos animais'),
          animalsAmount: Yup.string().required('Insira o número de animais'),
        });
        console.log('ok');

        await schema.validate(data, {
          abortEarly: false,
        });

        navigation.navigate('ChoosePastureType', {
          calc,
          animal,
          inputs: [
            {name: 'Peso médio', value: data.weigth, key: 'weigth'},
            {
              name: 'Número de animais que serão colocados no potreiro',
              value: data.animalsAmount,
              key: 'animalsAmount',
            },
            {
              name: 'Número de animais que serão colocados no potreiro',
              value: data.animalsAmount,
              key: 'animalsAmount',
            },
            {
              name: 'Número de animais que serão colocados no potreiro',
              value: data.animalsAmount,
              key: 'animalsAmount',
            },
          ],
        });
      }

      if (
        calc.name === 'Pastoreio contínuo' &&
        calc.value === 'Fornecer suplemento'
      ) {
        const schema = Yup.object().shape({
          weigth: Yup.string().required('Insira o peso médio dos animais'),
          animalsAmount: Yup.string().required('Insira o número de animais'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        navigation.navigate('ChoosePastureType', {
          calc,
          animal,
          inputs: [
            {name: 'Peso médio', value: data.weigth, key: 'weigth'},
            {
              name: 'Número de animais que serão colocados no potreiro',
              value: data.animalsAmount,
              key: 'animalsAmount',
            },
          ],
        });
      }

      const schema = Yup.object().shape({
        weigth: Yup.string().required('Insira o peso médio dos animais'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      /* navigation.navigate('ChoosePastureType', {
        calc,
        animal,
        inputs: [
          {
            name: 'Peso vivo médio dos animais',
            value: data.weigth,
            key: 'weigth',
          },
        ],
      }); */
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
            name="weigth"
            label="Peso vivo médio dos animais"
            keyboardType="numeric"
            placeholder="(kg PV)"
          />
          {calc.name === 'Pastoreio rotativo' &&
            calc.value === 'Ajustar lotação animal' && (
              <>
                {animal.value === 'Vaca em lactação' && (
                  <>
                    <Input
                      name="weeksOfLactation"
                      label="Semanas de Lactação"
                      keyboardType="numeric"
                      placeholder="10 semanas"
                    />
                    <Input
                      name="milkQuantity"
                      label="Produção de Leite (litros/dia)"
                      keyboardType="numeric"
                      placeholder="10 (litros/dia)"
                    />
                  </>
                )}
                {animal.value === 'Novilha Leiteira' && (
                  <Input
                    name="daysOfLactation"
                    label="N° de dias de gestação"
                    keyboardType="numeric"
                    placeholder="10"
                  />
                )}
              </>
            )}
          {calc.value === 'Dimensionar área do potreiro' && (
            <>
              <Input
                name="animalsAmount"
                label="Número de animais que serão colocados no potreiro"
                keyboardType="numeric"
                placeholder="Insira o número de animais"
              />
              {calc.name === 'Pastoreio rotativo' && (
                <>
                  <Input
                    name="rationAmount"
                    label="Os animais irão receber ração no cocho? Se sim, quanto?"
                    keyboardType="numeric"
                    placeholder="kg MS/animal/dia"
                    mb={60}
                  />
                  <Input
                    name="silageAmount"
                    label="Os animais irão receber silagem ou feno? Se sim, quanto?"
                    keyboardType="numeric"
                    placeholder="kg/animal/dia"
                  />
                </>
              )}
            </>
          )}
          {calc.name === 'Pastoreio contínuo' &&
            calc.value === 'Fornecer suplemento' && (
              <Input
                name="animalsAmount"
                label="Número de animais que serão colocados no potreiro"
                keyboardType="numeric"
                placeholder="Insira o número de animais"
              />
            )}
          {/* <SliderInput
            label="Escore de condição corporal"
            value={score}
            onValueChange={value => {
              setScore(value);
            }}
            minVal={0}
            maxVal={6}
            step={0.5}
          /> */}
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

export default AnimalInfo;
