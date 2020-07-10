/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
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
  supplyAmountRotative,
  supplyAmountContinuous,
  tracksAmountRotative,
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
          startDate: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
          foalArea: Yup.string().required('Insira a area do potreiro.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const results = numberOfAnimalsContinuous({
          weigth: inputs.find(input => input.key === 'weigth').value,
          startDate: new Date(data.startDate).getMonth(),
          pastureHeight: pastureHeight,
          typeOfPasture: pasture.key,
          foalArea: data.foalArea,
        });

        console.log(results);

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
              value: data.startDate.toString(),
              key: 'startDate',
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
      }
      if (
        calc.name === 'Pastoreio rotativo' &&
        calc.value === 'Ajustar lotação animal'
      ) {
        const schema = Yup.object().shape({
          foal_name: Yup.string().required('Insira o nome do potreiro.'),
          startDate: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
          numberOfTracks: Yup.string().required('Insira um valor.'),
          lenghtOfStay: Yup.string().required('Insira um valor.'),
          foalArea: Yup.string().required('Insira um valor.'),
          foodQuantity: Yup.string().required('Insira um valor.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const results = numberOfAnimalsRotative({
          startDate: data.startDate,
          foodQuantity: data.foodQuantity,
          numberOfTracks: data.numberOfTracks,
          pastureHeight,
          typeOfPasture: pasture.key,
          lenghtOfStay: data.lenghtOfStay,
          foalArea: data.foalArea,
          weigth: inputs.find(input => input.key === 'weigth').value,
          milkQuantity: inputs.find(input => input.key === 'milkQuantity')
            .value,
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
              value: data.startDate.toString(),
              key: 'startDate',
            },
            {
              name: 'Altura do pasto (cm)',
              value: pastureHeight,
              key: 'pastureHeight',
            },
            {
              name: 'Quantidade de alimento fornecido',
              value: data.foodQuantity,
              key: 'foodQuantity',
            },
            {
              name: 'Número de faixas',
              value: data.numberOfTracks,
              key: 'numberOfTracks',
            },
            {
              name: 'Tempo de permanência em cada faixa',
              value: data.lenghtOfStay,
              key: 'lenghtOfStay',
            },
            {
              name: 'Área total do potreiro (ha)',
              value: data.foalArea,
              key: 'foalArea',
            },
          ],
          results,
        };

        navigation.navigate('Result', calcState);
      }
      if (
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
          typeOfPasture: pasture.key,
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
              value: data.startDate.toString(),
              key: 'startDate',
            },
          ],
          results,
        };

        navigation.navigate('Result', calcState);
      }
      if (
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

        console.log(inputs);

        const results = foalSizeContinuous({
          startDate: data.startDate,
          weigth: inputs.find(input => input.key === 'weigth').value,
          typeOfPasture: pasture.key,
          animalsAmount: inputs.find(input => input.key === 'animalsAmount')
            .value,
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
              value: data.startDate.toString(),
              key: 'startDate',
            },
          ],
          results,
        };

        navigation.navigate('Result', calcState);
      }
      if (
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

        const results = supplyAmountContinuous({
          startDate: data.startDate,
          weigth: inputs.find(input => input.key === 'weigth').value,
          pastureHeight: pastureHeight,
          typeOfPasture: pasture.key,
          animalsAmount: inputs.find(input => input.key === 'animalsAmount')
            .value,
          foalArea: data.foalArea,
          typeOfAnimal: animal.value,
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
              value: data.startDate.toString(),
              key: 'startDate',
            },
            {
              name: 'Altura do pasto (cm)',
              value: pastureHeight,
              key: 'pastureHeight',
            },
            {
              name: 'Área total do potreiro (ha)',
              value: data.foalArea,
              key: 'foalArea',
            },
          ],
          results,
        };

        navigation.navigate('Result', calcState);
      }
      if (
        calc.name === 'Pastoreio rotativo' &&
        calc.value === 'Fornecer suplemento'
      ) {
        const schema = Yup.object().shape({
          foal_name: Yup.string().required('Insira o nome do potreiro.'),
          startDate: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
          tracksAmount: Yup.string().required('Insira o nome do potreiro.'),
          daysOfStay: Yup.string().required('Insira os dias de permanencia'),
          foalArea: Yup.string().required('Insira a area do potreiro.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const results = supplyAmountRotative({
          startDate: data.startDate,
          weigth: inputs.find(input => input.key === 'weigth').value,
          pastureHeight: pastureHeight,
          typeOfPasture: pasture.key,
          animalsAmount: inputs.find(input => input.key === 'animalsAmount')
            .value,
          foalArea: data.foalArea,
          typeOfAnimal: animal.value,
          tracksAmount: data.tracksAmount,
          daysOfStay: data.daysOfStay,
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
              value: data.startDate.toString(),
              key: 'startDate',
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
            {
              name: 'Número de faixas no potreiro',
              value: data.tracksAmount,
              key: 'tracksAmount',
            },
            {
              name: 'Tempo de permanência',
              value: data.daysOfStay,
              key: 'daysOfStay',
            },
          ],
          results,
        };

        navigation.navigate('Result', calcState);
      }
      if (
        calc.name === 'Pastoreio rotativo' &&
        calc.value === 'Calcular números de piquetes'
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

        const results = tracksAmountRotative({
          startDate: data.startDate,
          weigth: inputs.find(input => input.key === 'weigth').value,
          typeOfPasture: pasture.key,
          animalsAmount: inputs.find(input => input.key === 'animalsAmount')
            .value,
          foalArea: data.foalArea,
          typeOfAnimal: animal.value,
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
              value: data.startDate.toString(),
              key: 'startDate',
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
      }
      if (
        calc.name === 'Pastoreio rotativo' &&
        calc.value === 'Definir período de ocupação'
      ) {
        const schema = Yup.object().shape({
          foal_name: Yup.string().required('Insira o nome do potreiro.'),
          startDate: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
          foalArea: Yup.string().required('Insira a area do potreiro.'),
          tracksAmount: Yup.string().required('Insira um valor.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const results = tracksAmountRotative({
          startDate: data.startDate,
          weigth: inputs.find(input => input.key === 'weigth').value,
          typeOfPasture: pasture.key,
          animalsAmount: inputs.find(input => input.key === 'animalsAmount')
            .value,
          foalArea: data.foalArea,
          typeOfAnimal: animal.value,
          tracksAmount: data.tracksAmount,
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
              value: data.startDate.toString(),
              key: 'startDate',
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
            {
              name: 'Número de faixas no potreiro',
              value: data.tracksAmount,
              key: 'tracksAmount',
            },
          ],
          results,
        };

        navigation.navigate('Result', calcState);
      }

      navigation.navigate('Result');
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
          paddingHorizontal: 15,
          paddingBottom: 30,
        }}>
        <CalcRoutesTop items={items} color="#fff" />
        <SubTitle
          value="Informações sobre o sistema"
          size={14}
          mb={20}
          color="#fff"
        />
        {calc.name === 'Pastoreio contínuo' &&
          calc.value === 'Fornecer suplemento' && (
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
              <Input
                name="foalArea"
                label="Área total do potreiro (ha)"
                color="#fff"
                keyboardType="numeric"
                placeholder="1"
                returnKeyType="done"
                blurOnSubmit={true}
              />
            </Form>
          )}

        {calc.name === 'Pastoreio rotativo' &&
          calc.value === 'Fornecer suplemento' && (
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
                maxVal={100}
              />
              <Input
                name="foalArea"
                label="Área total do potreiro (ha)"
                color="#fff"
                keyboardType="numeric"
                placeholder="1"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => focusInput('tracksAmount')}
              />
              <Input
                name="tracksAmount"
                label="Número de faixas no potreiro"
                color="#fff"
                keyboardType="numeric"
                placeholder="(quantas subdivisões existem na área do potreiro)"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => focusInput('daysOfStay')}
              />
              <Input
                name="daysOfStay"
                keyboardType="numeric"
                label="Tempo de permanência"
                color="#fff"
                returnKeyType="done"
                blurOnSubmit={true}
              />
            </Form>
          )}

        {calc.value === 'Dimensionar área do potreiro' && (
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
          </Form>
        )}

        {calc.name === 'Pastoreio contínuo' &&
          calc.value === 'Ajustar lotação animal' && (
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
              <Input
                name="foodQuantity"
                label="Quantidade de alimento fornecido"
                color="#fff"
                keyboardType="numeric"
                placeholder="(kg/animal/dia)"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => focusInput('numberOfTracks')}
              />
              <Input
                name="numberOfTracks"
                label="Número de faixas"
                keyboardType="numeric"
                color="#fff"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => focusInput('lenghtOfStay')}
              />
              <Input
                name="lenghtOfStay"
                label="Tempo de permanência em cada faixa"
                keyboardType="numeric"
                color="#fff"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => focusInput('foalArea')}
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

        {calc.name === 'Pastoreio rotativo' &&
          calc.value === 'Calcular números de piquetes' && (
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
          calc.value === 'Definir período de ocupação' && (
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

              <Input
                name="foalArea"
                label="Área total do potreiro (ha)"
                color="#fff"
                keyboardType="numeric"
                placeholder="1"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => focusInput('tracksAmount')}
              />
              <Input
                name="tracksAmount"
                keyboardType="numeric"
                label="Número de faixas"
                color="#fff"
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
                maxVal={100}
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
