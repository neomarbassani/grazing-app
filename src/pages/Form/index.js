/* eslint-disable react-native/no-inline-styles */
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

import {
  numberOfAnimalsContinuous,
  numberOfAnimalsRotative,
  foalSizeRotative,
  foalSizeContinuous,
} from '../../services/calcs';

import aveia from '../../assets/aveiaFundo.jpg';
import azevem from '../../assets/azevemFundo.jpg';
import campoNativo from '../../assets/campoNativoFundo.jpg';
import campoNativoMelhorado from '../../assets/campoNativoMelhoradoFundo.jpg';
import milheto from '../../assets/milhetoFundo.jpg';
import papua from '../../assets/papuaFundo.jpeg';
import sorgo from '../../assets/sorgoFundo.jpg';
import sudao from '../../assets/sudaoFundo.jpg';
import tifton from '../../assets/tiftonFundo.jpg';

const DimensionArea = ({navigation, route}) => {
  const [pastureHeight, setPastureHeight] = useState(0);
  const {calc, animal, pasture, inputs} = route.params;

  const items = [calc.name];

  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      if (
        calc.name === 'Pastoreio contínuo' &&
        calc.value === 'Ajustar lotação animal'
      ) {
        const schema = Yup.object().shape({
          foal_name: Yup.string().required('Insira o nome do potreiro.'),
          startMouth: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
          foalArea: Yup.string().required('Insira a area do potreiro.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const results = numberOfAnimalsContinuous({
          weigth: inputs.find(input => input.key === 'weigth').value,
          startMouth: new Date(data.startMouth).getMonth(),
          pastureHeight: pastureHeight,
          typeOfPasture: pasture.key,
          foalArea: data.foalArea,
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
              value: data.foal_name,
              key: 'foal_name',
            },
            {
              name: 'Data de início do pastejo',
              value: data.startMouth.toString(),
              key: 'startMouth',
            },
            {
              name: 'Área total do potreiro (ha)',
              value: data.foalArea,
              key: 'foalArea',
            },
            {
              name: 'Altura do pasto (cm)',
              value: pastureHeight,
              key: 'pastureHeight',
            },
          ],
          results,
        };
       /*  navigation.navigate('Result', calcState); */
      } else if (
        calc.name === 'Pastoreio rotativo' &&
        calc.value === 'Ajustar lotação animal'
      ) {
        const schema = Yup.object().shape({
          foal_name: Yup.string().required('Insira o nome do potreiro.'),
          startDate: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
          foalArea: Yup.string().required('Insira a area do potreiro.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const results = numberOfAnimalsRotative({
          startDate: data.startDate,
          weigth: data.weigth,
          foodQuantity: data.foodQuantity,
          numberOfTracks: data.numberOfTracks,
          pastureHeight: data.pastureHeight,
          typeOfPasture: pasture.key,
          milkQuantity: inputs.find(input => input.key === 'milkQuantity')
            .value,
          lenghtOfStay: data.lenghtOfStay,
          foalArea: data.foalArea,
          weeksOfLactation: inputs.find(
            input => input.key === 'weeksOfLactation',
          ).value,
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
              value: data.foal_name,
              key: 'foal_name',
            },
            {
              name: 'Data de início do pastejo',
              value: data.startMouth.toString(),
              key: 'startMouth',
            },
            {
              name: 'Área total do potreiro (ha)',
              value: data.foalArea,
              key: 'foalArea',
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
      } else if (
        calc.name === 'Pastoreio rotativo' &&
        calc.value === 'Dimensionar área do potreiro'
      ) {
        const schema = Yup.object().shape({
          foal_name: Yup.string().required('Insira o nome do potreiro.'),
          startDate: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const results = foalSizeRotative({
          startDate: data.startDate,
          weigth: inputs.find(input => input.key === 'weigth').value,
          animalsAmount: inputs.find(input => input.key === 'animalsAmount')
            .value,
          rationAmount: inputs.find(input => input.key === 'rationAmount')
            .value,
          silageAmount: inputs.find(input => input.key === 'silageAmount')
            .value,
          pastureHeight: pastureHeight,
          typeOfPasture: pasture.key,
        });

        /* const calcState = {
          config: {
            calc,
            animal,
            pasture,
          },
          inputs: [
            ...inputs,
            {
              name: 'Nome do Potreiro',
              value: data.foal_name,
              key: 'foal_name',
            },
            {
              name: 'Data de início do pastejo',
              value: data.startDate.toString(),
              key: 'startDate',
            },
          ],
          results,
        };
 */
      } else if (
        calc.name === 'Pastoreio contínuo' &&
        calc.value === 'Dimensionar área do potreiro'
      ) {
        const schema = Yup.object().shape({
          foal_name: Yup.string().required('Insira o nome do potreiro.'),
          startDate: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const results = foalSizeContinuous({
          startDate: data.startDate,
          weigth: inputs.find(input => input.key === 'weigth').value,
          pastureHeight: pastureHeight,
          typeOfPasture: pasture.key,
        });

        /* const calcState = {
          config: {
            calc,
            animal,
            pasture,
          },
          inputs: [
            ...inputs,
            {
              name: 'Nome do Potreiro',
              value: data.foal_name,
              key: 'foal_name',
            },
            {
              name: 'Data de início do pastejo',
              value: data.startDate.toString(),
              key: 'startDate',
            },
          ],
          results,
        };
 */
      } else if (
        calc.name === 'Pastoreio contínuo' &&
        calc.value === 'Fornecer suplemento'
      ) {
        const schema = Yup.object().shape({
          foal_name: Yup.string().required('Insira o nome do potreiro.'),
          startDate: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const results = foalSizeContinuous({
          startDate: data.startDate,
          weigth: inputs.find(input => input.key === 'weigth').value,
          pastureHeight: pastureHeight,
          typeOfPasture: pasture.key,
        });

        /* const calcState = {
          config: {
            calc,
            animal,
            pasture,
          },
          inputs: [
            ...inputs,
            {
              name: 'Nome do Potreiro',
              value: data.foal_name,
              key: 'foal_name',
            },
            {
              name: 'Data de início do pastejo',
              value: data.startDate.toString(),
              key: 'startDate',
            },
          ],
          results,
        };
 */
      } else {
        const schema = Yup.object().shape({
          foal_name: Yup.string().required('Insira o nome do potreiro.'),
          startDate: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        console.log(inputs);

        /* navigation.navigate('Result', calcState); */
      }
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
    <Container
      source={
        pasture.value === 'Azevém'
          ? azevem
          : pasture.value === 'Campo Nativo'
          ? campoNativo
          : pasture.value === 'Campo Nativo Melhorado'
          ? campoNativoMelhorado
          : pasture.value === 'Aveia'
          ? aveia
          : pasture.value === 'Milheto'
          ? milheto
          : pasture.value === 'Sudão'
          ? sudao
          : pasture.value === 'Papuã'
          ? papua
          : pasture.value === 'Sorgo'
          ? sorgo
          : tifton
      }
      resizeMode="cover">
      <ProgressBar size={87.5} />
      <CalcHeader color="#fff" />
      <Content
        contentContainerStyle={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
        }}>
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
            onSubmitEditing={() => focusInput('startDate')}
          />
          <Input
            name="startDate"
            color="#fff"
            label="Data de início do pastejo"
            keyboardType="numeric"
            placeholder="DD/MM/YYYY"
            maskType="datetime"
            options={{
              format: 'DD/MM/YYYY',
            }}
            returnKeyType="done"
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
            maxVal={100}
          />
        </Form>

        {calc.name === 'Pastoreio contínuo' &&
          calc.value === 'Fornecer suplemento' && (
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="foalArea"
                label="Área total do potreiro (ha)"
                color="#fff"
                keyboardType="numeric"
                placeholder="1"
                returnKeyType="next"
                blurOnSubmit={true}
              />
            </Form>
          )}

        {calc.name === 'Pastoreio contínuo' &&
          calc.value === 'Ajustar lotação animal' && (
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="foalArea"
                label="Área total do potreiro (ha)"
                color="#fff"
                keyboardType="numeric"
                placeholder="1"
                returnKeyType="next"
                blurOnSubmit={true}
              />
            </Form>
          )}
        {calc.name === 'Pastoreio rotativo' &&
          calc.value === 'Ajustar lotação animal' && (
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="foal_name"
                label="Nome do Potreiro"
                color="#fff"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => focusInput('startMouth')}
              />
              <Input
                name="startMouth"
                color="#fff"
                label="Data de início do pastejo"
                keyboardType="numeric"
                placeholder="DD/MM/YYYY"
                maskType="datetime"
                options={{
                  format: 'DD/MM/YYYY',
                }}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => focusInput('foodQuantity')}
              />
              <Input
                name="foodQuantity"
                label="Quantidade de alimento fornecido "
                color="#fff"
                placeholder="(kg/animal/dia)"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => focusInput('lenghtOfStay')}
              />
              <Input
                name="numberOfTracks"
                label="Número de faixas"
                color="#fff"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => focusInput('foalArea')}
              />
              <Input
                name="lenghtOfStay"
                label="Tempo de permanência em cada faixa"
                color="#fff"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => focusInput('numberOfTracks')}
              />
              <Input
                name="foalArea"
                label="Área total do potreiro (ha)"
                color="#fff"
                keyboardType="numeric"
                placeholder="1"
                returnKeyType="next"
                blurOnSubmit={true}
              />
            </Form>
          )}
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
