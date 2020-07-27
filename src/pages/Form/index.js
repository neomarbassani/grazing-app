/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {View, Dimensions} from 'react-native';
import * as Yup from 'yup';
import {Form} from '@unform/mobile';

const {height} = Dimensions.get('window');
import Container from '../../layout/App';

import SubTitle from '../../components/SubTitle';
import ProgressBar from '../../components/ProgressBar';
import CalcHeader from '../../components/CalcHeader';
import CalcRoutesTop from '../../components/CalcRoutesTop';
import Input from '../../components/Input';
import SliderInput from '../../components/SliderInput';
import Button from '../../components/Button';
import HelpButton from '../../components/HelpButton';

import {Content} from './styles';
import Snackbar from 'react-native-snackbar';

import {
  numberOfAnimalsContinuous,
  numberOfAnimalsRotative,
  foalSizeRotative,
  foalSizeContinuous,
  supplyAmountRotative,
  supplyAmountContinuous,
  tracksAmountRotative,
  mouth,
  taxaDeAcumulo,
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

import help from './data';

const DimensionArea = ({navigation, route}) => {
  const [pastureHeight, setPastureHeight] = useState(0);
  const {calc, animal, pasture, inputs} = route.params;

  const items = [calc.value, calc.name, animal && animal.value, pasture.value];

  const maxValuesToSlider = {
    aveia: 50,
    azevem: 50,
    aveiaAzevem: 50,
    campoNativo: 30,
    campoNativoMelhorado: 30,
    sudao: 100,
    milheto: 80,
    papua: 60,
    sorgo: 150,
    tifton: 40,
  };

  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const checkIfAnyValueExistsForPastureInfo =
        taxaDeAcumulo[pasture.key][mouth[new Date(data.startDate).getMonth()]];

      if (typeof checkIfAnyValueExistsForPastureInfo === 'undefined') {
        return Snackbar.show({
          text:
            'A espécie selecionada não apresenta crescimento ativo no período.',
          duration: Snackbar.LENGTH_SHORT,
          textColor: '#fff',
          backgroundColor: '#ff0000',
        });
      }

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
          lenghtOfStay: Yup.string()
            .required('Insira a quantidade de dias de ocupação.')
            .max(90, 'O máximo de dias é 90.'),
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
          lenghtOfStay: data.lenghtOfStay,
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
              name: 'Tempo de permanência',
              value: data.lenghtOfStay,
              key: 'lenghtOfStay',
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
          lenghtOfStay: Yup.string()
            .required('Insira um valor.')
            .max(90, 'O máximo de dias é 90.'),
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
          typeOfAnimal: animal,
          typeOfPasture: pasture.key,
          lenghtOfStay: data.lenghtOfStay,
          foalArea: data.foalArea,
          weigth: inputs.find(input => input.key === 'weigth').value,
          milkQuantity: inputs.find(input => input.key === 'milkQuantity')
            .value,
          weeksOfLactation: inputs.find(
            input => input.key === 'weeksOfLactation',
          ).value,
          daysOfLactation: inputs.find(input => input.key === 'daysOfLactation')
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
          hayAmount: inputs.find(input => input.key === 'hayAmount').value,
          typeOfPasture: pasture.key,
          typeOfAnimal: animal,
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
          lenghtOfStay: Yup.string()
            .required('Insira a quantidade de dias de ocupação.')
            .max(90, 'O máximo de dias é 90.'),
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
          lenghtOfStay: data.lenghtOfStay,
          typeOfAnimal: animal,
          daysOfLactation:
            inputs.find(input => input.key === 'daysOfLactation').value || 0,
          weeksOfLactation: inputs.find(
            input => input.key === 'weeksOfLactation',
          ).value,
          milkQuantity: inputs.find(input => input.key === 'milkQuantity')
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
              name: 'Tempo de permanência',
              value: data.lenghtOfStay,
              key: 'lenghtOfStay',
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
          daysOfStay: Yup.string()
            .required('Insira os dias de permanência')
            .max(90, 'O máximo de dias é 90.'),
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
          typeOfAnimal: animal,
          tracksAmount: data.tracksAmount,
          daysOfStay: data.daysOfStay,
          daysOfLactation: inputs.find(input => input.key === 'daysOfLactation')
            .value,
          weeksOfLactation: inputs.find(
            input => input.key === 'weeksOfLactation',
          ).value,
          milkQuantity: inputs.find(input => input.key === 'milkQuantity')
            .value,
          rationAmount: inputs.find(input => input.key === 'rationAmount')
            .value,
          silageAmount: inputs.find(input => input.key === 'silageAmount')
            .value,
          hayAmount: inputs.find(input => input.key === 'hayAmount').value,
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
      if (calc.value === 'Calcular números de piquetes') {
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
          /* weigth: inputs.find(input => input.key === 'weigth').value, */
          typeOfPasture: pasture.key,
          /* animalsAmount: inputs.find(input => input.key === 'animalsAmount')
            .value,
          foalArea: data.foalArea,
          typeOfAnimal: animal.value, */
        });

        console.log(
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
        );

        const calcState = {
          config: {
            calc,
            animal: animal ? animal : null,
            pasture,
          },
          inputs: [
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

        /* {
              name: 'Área total do potreiro (ha)',
              value: data.foalArea,
              key: 'foalArea',
            },
            {
              name: 'Altura do pasto (cm)',
              value: pastureHeight,
              key: 'pastureHeight',
            }, */

        console.log(calcState);
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
          typeOfAnimal: animal,
          tracksAmount: data.tracksAmount,
          daysOfLactation: inputs.find(input => input.key === 'daysOfLactation')
            .value,
          weeksOfLactation: inputs.find(
            input => input.key === 'weeksOfLactation',
          ).value,
          milkQuantity: inputs.find(input => input.key === 'milkQuantity')
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
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center',
          height: height - 60,
          width: '100%',
        }}>
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
                  onSubmitEditing={() => focusInput('lenghtOfStay')}>
                  <HelpButton data={help[0]} />
                </Input>
                <Input
                  name="lenghtOfStay"
                  color="#fff"
                  label="Tempo de permanência"
                  keyboardType="numeric"
                  placeholder="Nº de dias"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('startDate')}>
                  <HelpButton data={help[2]} />
                </Input>
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
                  maxVal={maxValuesToSlider[pasture.key]}
                />
                <Input
                  name="foalArea"
                  label="Área total do potreiro (ha)"
                  color="#fff"
                  keyboardType="numeric"
                  placeholder="1"
                  returnKeyType="done"
                  blurOnSubmit={true}>
                  <HelpButton data={help[2]} />
                </Input>
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
                  onSubmitEditing={() => focusInput('startDate')}>
                  <HelpButton data={help[0]} />
                </Input>
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
                  maxVal={maxValuesToSlider[pasture.key]}
                />
                <Input
                  name="foalArea"
                  label="Área total do potreiro (ha)"
                  color="#fff"
                  keyboardType="numeric"
                  placeholder="1"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('tracksAmount')}>
                  <HelpButton data={help[1]} />
                </Input>
                <Input
                  name="tracksAmount"
                  label="Número de faixas no potreiro"
                  color="#fff"
                  keyboardType="numeric"
                  placeholder="(quantas subdivisões existem na área do potreiro)"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('daysOfStay')}>
                  <HelpButton data={help[4]} />
                </Input>
                <Input
                  name="daysOfStay"
                  keyboardType="numeric"
                  label="Tempo de permanência"
                  color="#fff"
                  returnKeyType="done"
                  blurOnSubmit={true}>
                  <HelpButton data={help[5]} />
                </Input>
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
                onSubmitEditing={() => focusInput('startDate')}>
                <HelpButton data={help[0]} />
              </Input>
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
                  onSubmitEditing={() => focusInput('startDate')}>
                  <HelpButton data={help[0]} />
                </Input>
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
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('lenghtOfStay')}
                />
                <Input
                  name="lenghtOfStay"
                  color="#fff"
                  label="Tempo de permanência"
                  keyboardType="numeric"
                  placeholder="Nº de dias"
                  returnKeyType="next"
                  blurOnSubmit={true}>
                  <HelpButton data={help[2]} />
                </Input>
                <SliderInput
                  label="Altura do pasto (cm)"
                  value={pastureHeight}
                  color="#fff"
                  mt={10}
                  onValueChange={value => {
                    setPastureHeight(value);
                  }}
                  minVal={0}
                  maxVal={maxValuesToSlider[pasture.key]}
                />
                <Input
                  name="foalArea"
                  label="Área total do potreiro (ha)"
                  color="#fff"
                  keyboardType="numeric"
                  placeholder="1"
                  returnKeyType="next"
                  blurOnSubmit={true}>
                  <HelpButton data={help[1]} />
                </Input>
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
                  onSubmitEditing={() => focusInput('startDate')}>
                  <HelpButton data={help[0]} />
                </Input>
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
                  maxVal={maxValuesToSlider[pasture.key]}
                />
                <Input
                  name="foodQuantity"
                  label="Quantidade de alimento fornecido"
                  color="#fff"
                  keyboardType="numeric"
                  placeholder="(kg/animal/dia)"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('numberOfTracks')}>
                  <HelpButton data={help[6]} />
                </Input>
                <Input
                  name="numberOfTracks"
                  label="Número de faixas"
                  keyboardType="numeric"
                  color="#fff"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('lenghtOfStay')}>
                  <HelpButton data={help[4]} />
                </Input>
                <Input
                  name="lenghtOfStay"
                  label="Tempo de permanência em cada faixa"
                  keyboardType="numeric"
                  color="#fff"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('foalArea')}>
                  <HelpButton data={help[5]} />
                </Input>
                <Input
                  name="foalArea"
                  label="Área total do potreiro (ha)"
                  color="#fff"
                  keyboardType="numeric"
                  placeholder="1"
                  returnKeyType="next"
                  blurOnSubmit={true}>
                  <HelpButton data={help[1]} />
                </Input>
              </Form>
            )}

          {calc.value === 'Calcular números de piquetes' && (
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="foal_name"
                label="Nome do Potreiro"
                color="#fff"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => focusInput('startDate')}>
                <HelpButton data={help[0]} />
              </Input>

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

          {calc.name === 'Pastoreio rotativo' &&
            calc.value === 'Definir período de ocupação' && (
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input
                  name="foal_name"
                  label="Nome do Potreiro"
                  color="#fff"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('startDate')}>
                  <HelpButton data={help[0]} />
                </Input>
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
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('tracksAmount')}>
                  <HelpButton data={help[1]} />
                </Input>
                <Input
                  name="tracksAmount"
                  keyboardType="numeric"
                  label="Número de faixas"
                  color="#fff"
                  returnKeyType="next"
                  blurOnSubmit={true}>
                  <HelpButton data={help[4]} />
                </Input>
                <SliderInput
                  label="Altura do pasto (cm)"
                  value={pastureHeight}
                  color="#fff"
                  mt={10}
                  onValueChange={value => {
                    setPastureHeight(value);
                  }}
                  minVal={0}
                  maxVal={maxValuesToSlider[pasture.key]}
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
      </View>
    </Container>
  );
};

export default DimensionArea;
