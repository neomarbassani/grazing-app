/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {View, Dimensions} from 'react-native';
import * as Yup from 'yup';
import {Form} from '@unform/mobile';

import {useSelector} from 'react-redux';

import moment from 'moment';

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
import RadioButton from '../../components/RadioButton';

import {Content} from './styles';
import Snackbar from 'react-native-snackbar';

import {
  taxaDeAcumuloPorEspecie,
  ajustarLotacaoAnimalContinuo,
  ajustarLotacaoAnimalRotativo,
  calcularNumeroDePiquetes,
  definirPeriodoDeOcupacaoRotativo,
  fornecerSuplementoContinuo,
  fornecerSuplementoRotativo,
  tamanhoPotreiroContinuo,
  tamanhoPotreiroRotativo,
} from '../../services/calcs';

import aveia from '../../assets/aveiaFundo.jpg';
import azevem from '../../assets/azevemFundo.jpg';
import aveiaAzevem from '../../assets/aveiaAzevemFundo.jpg';
import campoNativo from '../../assets/campoNativoFundo.jpg';
import campoNativoMelhorado from '../../assets/campoNativoMelhoradoFundo.jpg';
import milheto from '../../assets/milhetoFundo.jpg';
import papua from '../../assets/papuaFundo.jpeg';
import sorgo from '../../assets/sorgoFundo.jpg';
import sudao from '../../assets/sudaoFundo.jpg';
import tifton from '../../assets/tiftonFundo.jpg';

import help from './data';

const FormContainer = ({navigation, route}) => {
  const [alturaDoPasto, setAlturaDoPasto] = useState(1);
  const [tempoDePermanencia, setTempoDePermanencia] = useState(1);
  const [areaDoPotreiro, setAreaDoPotreiro] = useState(1);
  const [suplementacaoAdicional, setSuplementacaoAdicional] = useState({
    label: 'Não',
    value: 0,
  });

  const user = useSelector(state => state.auth.user);

  const {calc, animal, pasture, inputs} = route.params;

  const items = [
    calc.value,
    calc.name,
    animal && animal.name,
    animal && animal.value,
    pasture.value,
  ];

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

  const animalType = {
    type: {
      terneiro: 'Terneiro(a)',
      novilha: 'Novilho(a)',
      novilhaLeite: 'Novilha',
      vacaSeca: 'Vaca Seca',
      vacaPrenha: 'Vaca Prenha',
      vacaLactacao: 'Vaca em lactação',
    },
    category: {
      bovinoCorte: 'Bovinocultura de Corte',
      bovinoLeite: 'Bovinocultura de leite',
    },
  };

  function getAnimal(an) {
    return {
      name: animalType.category[an.name],
      value: animalType.type[an.value],
    };
  }

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const mouth = moment(data.dataDeInicio).format('M');

      const checkIfAnyValueExistsForPastureInfo =
        taxaDeAcumuloPorEspecie[pasture.value][mouth];

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
          nomeDoPotreiro: Yup.string().required('Insira o nome do potreiro.'),
          dataDeInicio: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const results = ajustarLotacaoAnimalContinuo({
          dataDeInicio: data.dataDeInicio,
          peso: inputs.find(input => input.key === 'peso').value,
          alturaDoPasto,
          tipoDePasto: pasture.value,
          areaDoPotreiro,
          tempoDePermanencia,
        });

        const calcState = {
          config: {
            calc,
            animal: getAnimal(animal),
            pasture,
          },
          inputs: [
            ...inputs,
            {
              name: 'Nome do Potreiro',
              value: data.nomeDoPotreiro,
              key: 'nomeDoPotreiro',
            },
            {
              name: 'Data de início do pastejo',
              value: data.dataDeInicio.toString(),
              key: 'dataDeInicio',
            },
            {
              name: 'Área do potreiro (ha)',
              value: areaDoPotreiro,
              key: 'areaDoPotreiro',
            },
            {
              name: 'Altura do pasto (cm)',
              value: alturaDoPasto,
              key: 'alturaDoPasto',
            },
            {
              name: 'Tempo de permanência',
              value: tempoDePermanencia,
              key: 'tempoDePermanencia',
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
          nomeDoPotreiro: Yup.string().required('Insira o nome do potreiro.'),
          dataDeInicio: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
          numeroDePiquetes: Yup.string()
            .required('Insira o número de piquetes.')
            .notOneOf(['1'], 'Mínimo 2 piquetes'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const results = ajustarLotacaoAnimalRotativo({
          dataDeInicio: data.dataDeInicio,
          peso: inputs.find(input => input.key === 'peso').value,
          racao: suplementacaoAdicional === -1 ? -1 : data.racao || 0,
          feno: data.feno || 0,
          silagem: data.silagem || 0,
          numeroDePiquetes: data.numeroDePiquetes,
          alturaDoPasto: alturaDoPasto,
          tipoDePasto: pasture.value,
          tempoDePermanencia: tempoDePermanencia,
          areaDoPotreiro: areaDoPotreiro,
          diasDeGestacao:
            inputs.find(input => input.key === 'diasDeGestacao').value || 0,
          semanasDeLactacao:
            inputs.find(input => input.key === 'semanasDeLactacao').value || 0,
          quantidadeDeLeite:
            inputs.find(input => input.key === 'quantidadeDeLeite').value || 0,
          categoriaAnimal: animal.name,
          tipoDeAnimal: animal.value,
        });

        const calcState = {
          config: {
            calc,
            animal: getAnimal(animal),
            pasture,
          },
          inputs: [
            ...inputs,
            {
              name: 'Nome do Potreiro',
              value: data.nomeDoPotreiro,
              key: 'nomeDoPotreiro',
            },
            {
              name: 'Data de início do pastejo',
              value: data.dataDeInicio.toString(),
              key: 'dataDeInicio',
            },
            {
              name: 'Altura do pasto (cm)',
              value: alturaDoPasto,
              key: 'alturaDoPasto',
            },
            {
              name: 'Ração',
              value: data.racao || 0,
              key: 'racao',
            },
            {
              name: 'Silagem',
              value: data.silagem || 0,
              key: 'silagem',
            },
            {
              name: 'Feno',
              value: data.feno || 0,
              key: 'feno',
            },
            {
              name: 'Número de faixas',
              value: data.numeroDePiquetes,
              key: 'numeroDePiquetes',
            },
            {
              name: 'Tempo de permanência em cada faixa',
              value: tempoDePermanencia,
              key: 'tempoDePermanencia',
            },
            {
              name: 'Área do potreiro (ha)',
              value: areaDoPotreiro,
              key: 'areaDoPotreiro',
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
          nomeDoPotreiro: Yup.string().required('Insira o nome do potreiro.'),
          dataDeInicio: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
          quantidadeDeAnimais: Yup.string().required(
            'Insira a quantidade de animais.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const results = tamanhoPotreiroRotativo({
          dataDeInicio: data.dataDeInicio,
          peso: inputs.find(input => input.key === 'peso').value,
          racao: suplementacaoAdicional === -1 ? -1 : data.racao,
          feno: data.feno,
          silagem: data.silagem,
          quantidadeDeAnimais: data.quantidadeDeAnimais,
          tipoDePasto: pasture.value,
          diasDeGestacao: inputs.find(input => input.key === 'diasDeGestacao')
            .value,
          semanasDeLactacao: inputs.find(
            input => input.key === 'semanasDeLactacao',
          ).value,
          quantidadeDeLeite: inputs.find(
            input => input.key === 'quantidadeDeLeite',
          ).value,
          categoriaAnimal: animal.name,
          tipoDeAnimal: animal.value,
        });

        const calcState = {
          config: {
            calc,
            animal: getAnimal(animal),
            pasture,
          },
          inputs: [
            ...inputs,
            {
              name: 'Nome do Potreiro',
              value: data.nomeDoPotreiro,
              key: 'nomeDoPotreiro',
            },
            {
              name: 'Data de início do pastejo',
              value: data.dataDeInicio.toString(),
              key: 'dataDeInicio',
            },
            {
              name: 'Ração',
              value: data.racao || 0,
              key: 'racao',
            },
            {
              name: 'Silagem',
              value: data.silagem || 0,
              key: 'silagem',
            },
            {
              name: 'Feno',
              value: data.feno || 0,
              key: 'feno',
            },
            {
              name: 'Número de animais',
              value: data.quantidadeDeAnimais,
              key: 'quantidadeDeAnimais',
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
          nomeDoPotreiro: Yup.string().required('Insira o nome do potreiro.'),
          dataDeInicio: Yup.date('Insira uma data válida').required(
            'Insira a data de início.',
          ),
          quantidadeDeAnimais: Yup.string().required(
            'Insira a quantidade de animais.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const results = tamanhoPotreiroContinuo({
          dataDeInicio: data.dataDeInicio,
          peso: inputs.find(input => input.key === 'peso').value,
          quantidadeDeAnimais: data.quantidadeDeAnimais,
          tipoDePasto: pasture.value,
        });

        const calcState = {
          config: {
            calc,
            animal: getAnimal(animal),
            pasture,
          },
          inputs: [
            ...inputs,
            {
              name: 'Nome do Potreiro',
              value: data.nomeDoPotreiro,
              key: 'nomeDoPotreiro',
            },
            {
              name: 'Data de início do pastejo',
              value: data.dataDeInicio.toString(),
              key: 'dataDeInicio',
            },
            {
              name: 'Número de animais',
              value: data.quantidadeDeAnimais,
              key: 'quantidadeDeAnimais',
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
          nomeDoPotreiro: Yup.string().required('Insira o nome do potreiro.'),
          dataDeInicio: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
          quantidadeDeAnimais: Yup.string().required(
            'Insira a quantidade de animais.',
          ),
          alturaDoPasto: Yup.number().required('Informe a altura do pasto.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const results = fornecerSuplementoContinuo({
          areaDoPotreiro,
          alturaDoPasto,
          tempoDePermanencia,
          dataDeInicio: data.dataDeInicio,
          peso: inputs.find(input => input.key === 'peso').value,
          quantidadeDeAnimais: data.quantidadeDeAnimais,
          tipoDePasto: pasture.value,
          diasDeGestacao: inputs.find(input => input.key === 'diasDeGestacao')
            .value,
          semanasDeLactacao: inputs.find(
            input => input.key === 'semanasDeLactacao',
          ).value,
          quantidadeDeLeite: inputs.find(
            input => input.key === 'quantidadeDeLeite',
          ).value,
          categoriaAnimal: animal.name,
          tipoDeAnimal: animal.value,
        });

        const calcState = {
          config: {
            calc,
            animal: getAnimal(animal),
            pasture,
          },
          inputs: [
            ...inputs,
            {
              name: 'Nome do Potreiro',
              value: data.nomeDoPotreiro,
              key: 'nomeDoPotreiro',
            },
            {
              name: 'Data de início do pastejo',
              value: data.dataDeInicio.toString(),
              key: 'dataDeInicio',
            },
            {
              name: 'Altura do pasto (cm)',
              value: alturaDoPasto,
              key: 'alturaDoPasto',
            },
            {
              name: 'Número de animais',
              value: data.quantidadeDeAnimais,
              key: 'quantidadeDeAnimais',
            },
            {
              name: 'Tempo de permanência em cada faixa',
              value: tempoDePermanencia,
              key: 'tempoDePermanencia',
            },
            {
              name: 'Área do potreiro (ha)',
              value: areaDoPotreiro,
              key: 'areaDoPotreiro',
            },
            {
              name: 'Ração',
              value: data.racao || 0,
              key: 'racao',
            },
            {
              name: 'Silagem',
              value: data.silagem || 0,
              key: 'silagem',
            },
            {
              name: 'Feno',
              value: data.feno || 0,
              key: 'feno',
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
          nomeDoPotreiro: Yup.string().required('Insira o nome do potreiro.'),
          dataDeInicio: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
          quantidadeDeAnimais: Yup.string().required(
            'Insira a quantidade de animais.',
          ),
          numeroDePiquetes: Yup.string()
            .required('Insira o número de piquetes.')
            .notOneOf(['1'], 'Mínimo 2 piquetes'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const results = fornecerSuplementoRotativo({
          numeroDePiquetes: data.numeroDePiquetes,
          diasDePermanencia: tempoDePermanencia,
          areaDoPotreiro,
          alturaDoPasto,
          tempoDePermanencia,
          dataDeInicio: data.dataDeInicio,
          peso: inputs.find(input => input.key === 'peso').value,
          quantidadeDeAnimais: data.quantidadeDeAnimais,
          tipoDePasto: pasture.value,
          diasDeGestacao: inputs.find(input => input.key === 'diasDeGestacao')
            .value,
          semanasDeLactacao: inputs.find(
            input => input.key === 'semanasDeLactacao',
          ).value,
          quantidadeDeLeite: inputs.find(
            input => input.key === 'quantidadeDeLeite',
          ).value,
          categoriaAnimal: animal.name,
          tipoDeAnimal: animal.value,
        });

        const calcState = {
          config: {
            calc,
            animal: getAnimal(animal),
            pasture,
          },
          inputs: [
            ...inputs,
            {
              name: 'Nome do Potreiro',
              value: data.nomeDoPotreiro,
              key: 'nomeDoPotreiro',
            },
            {
              name: 'Data de início do pastejo',
              value: data.dataDeInicio.toString(),
              key: 'dataDeInicio',
            },
            {
              name: 'Número de animais',
              value: data.quantidadeDeAnimais,
              key: 'quantidadeDeAnimais',
            },
            {
              name: 'Área do potreiro (ha)',
              value: areaDoPotreiro,
              key: 'areaDoPotreiro',
            },
            {
              name: 'Altura do pasto (cm)',
              value: alturaDoPasto,
              key: 'alturaDoPasto',
            },
            {
              name: 'Número de piquetes',
              value: data.numeroDePiquetes,
              key: 'numeroDePiquetes',
            },
            {
              name: 'Período de ocupação',
              value: tempoDePermanencia,
              key: 'tempoDePermanencia',
            },
          ],
          results,
        };

        navigation.navigate('Result', calcState);
      }

      if (calc.value === 'Calcular número de piquetes') {
        const schema = Yup.object().shape({
          nomeDoPotreiro: Yup.string().required('Insira o nome do potreiro.'),
          dataDeInicio: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
          quantidadeDeAnimais: Yup.string().required(
            'Insira a quantidade de animais',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const results = calcularNumeroDePiquetes({
          areaDoPotreiro,
          dataDeInicio: data.dataDeInicio,
          peso: inputs.find(input => input.key === 'peso').value,
          racao: suplementacaoAdicional === -1 ? -1 : data.racao || 0,
          feno: data.feno || 0,
          silagem: data.silagem || 0,
          quantidadeDeAnimais: data.quantidadeDeAnimais,
          tipoDePasto: pasture.value,
          diasDeGestacao:
            inputs.find(input => input.key === 'diasDeGestacao').value || 0,
          semanasDeLactacao:
            inputs.find(input => input.key === 'semanasDeLactacao').value || 0,
          quantidadeDeLeite:
            inputs.find(input => input.key === 'quantidadeDeLeite').value || 0,
          categoriaAnimal: animal.name,
          tipoDeAnimal: animal.value,
        });

        const calcState = {
          config: {
            calc,
            animal: animal ? animal : null,
            pasture,
          },
          inputs: [
            {
              name: 'Nome do Potreiro',
              value: data.nomeDoPotreiro,
              key: 'nomeDoPotreiro',
            },
            {
              name: 'Data de início do pastejo',
              value: data.dataDeInicio.toString(),
              key: 'dataDeInicio',
            },
            {
              name: 'Ração',
              value: data.racao || 0,
              key: 'racao',
            },
            {
              name: 'Silagem',
              value: data.silagem || 0,
              key: 'silagem',
            },
            {
              name: 'Feno',
              value: data.feno || 0,
              key: 'feno',
            },
            {
              name: 'Número de animais',
              value: data.quantidadeDeAnimais,
              key: 'quantidadeDeAnimais',
            },
            {
              name: 'Área do potreiro (ha)',
              value: areaDoPotreiro,
              key: 'areaDoPotreiro',
            },
          ],
          results,
        };

        navigation.navigate('Result', calcState);
      }

      if (calc.value === 'Definir período de ocupação') {
        const schema = Yup.object().shape({
          nomeDoPotreiro: Yup.string().required('Insira o nome do potreiro.'),
          dataDeInicio: Yup.date('Insira uma data válida').required(
            'Insira a data de inicio.',
          ),
          numeroDePiquetes: Yup.string()
            .required('Insira o número de piquetes.')
            .notOneOf(['1'], 'Mínimo 2 piquetes'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const results = definirPeriodoDeOcupacaoRotativo({
          alturaDoPasto,
          numeroDePiquetes: data.numeroDePiquetes,
          areaDoPotreiro,
          dataDeInicio: data.dataDeInicio,
          peso: inputs.find(input => input.key === 'peso').value,
          racao: suplementacaoAdicional === -1 ? -1 : data.racao || 0,
          feno: data.feno || 0,
          silagem: data.silagem || 0,
          quantidadeDeAnimais: data.quantidadeDeAnimais,
          tipoDePasto: pasture.value,
          diasDeGestacao:
            inputs.find(input => input.key === 'diasDeGestacao').value || 0,
          semanasDeLactacao:
            inputs.find(input => input.key === 'semanasDeLactacao').value || 0,
          quantidadeDeLeite:
            inputs.find(input => input.key === 'quantidadeDeLeite').value || 0,
          categoriaAnimal: animal.name,
          tipoDeAnimal: animal.value,
        });

        const calcState = {
          config: {
            calc,
            animal: getAnimal(animal),
            pasture,
          },
          inputs: [
            ...inputs,
            {
              name: 'Nome do Potreiro',
              value: data.nomeDoPotreiro,
              key: 'nomeDoPotreiro',
            },
            {
              name: 'Data de início do pastejo',
              value: data.dataDeInicio.toString(),
              key: 'dataDeInicio',
            },
            {
              name: 'Área do potreiro (ha)',
              value: areaDoPotreiro,
              key: 'areaDoPotreiro',
            },
            {
              name: 'Altura do pasto (cm)',
              value: alturaDoPasto,
              key: 'alturaDoPasto',
            },
            {
              name: 'Número de animais',
              value: data.quantidadeDeAnimais,
              key: 'quantidadeDeAnimais',
            },
            {
              name: 'Número de piquetes',
              value: data.numeroDePiquetes,
              key: 'numeroDePiquetes',
            },
            {
              name: 'Ração',
              value: data.racao || 0,
              key: 'racao',
            },
            {
              name: 'Silagem',
              value: data.silagem || 0,
              key: 'silagem',
            },
            {
              name: 'Feno',
              value: data.feno || 0,
              key: 'feno',
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

  const options = [
    {label: 'Sim', value: 1},
    {label: 'Não', value: 0},
    {label: 'Não Sei', value: -1},
  ];

  return (
    <Container
      source={
        pasture.value === 'azevem'
          ? azevem
          : pasture.value === 'campoNativo'
          ? campoNativo
          : pasture.value === 'campoNativoMelhorado'
          ? campoNativoMelhorado
          : pasture.value === 'aveia'
          ? aveia
          : pasture.value === 'milheto'
          ? milheto
          : pasture.value === 'sudao'
          ? sudao
          : pasture.value === 'papua'
          ? papua
          : pasture.value === 'sorgo'
          ? sorgo
          : pasture.value === 'tifton'
          ? tifton
          : aveiaAzevem
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

        <View
          style={{
            flex: 1,
            width: '100%',
            paddingHorizontal: 15,
          }}>
          <CalcRoutesTop items={items} color="#fff" />
          <SubTitle
            value="Informações sobre o sistema"
            size={14}
            mb={20}
            color="#fff"
          />
          <Content
            style={{
              width: '100%',
            }}>
            {calc.value === 'Fornecer suplemento' && (
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input
                  name="nomeDoPotreiro"
                  label="Identificação do Potreiro"
                  placeholder="Nome ou número do potreiro"
                  color="#fff"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('dataDeInicio')}>
                  <HelpButton data={help.identificacao} />
                </Input>
                <Input
                  name="dataDeInicio"
                  color="#fff"
                  label="Data de início do pastejo"
                  keyboardType="numeric"
                  maskType="datetime"
                  typeIcon="datetimepicker"
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('quantidadeDeAnimais')}
                />
                <Input
                  name="quantidadeDeAnimais"
                  color="#fff"
                  label="Número de animais"
                  keyboardType="numeric"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('numeroDePiquetes')}>
                  <HelpButton data={help.numeroAnimais} />
                </Input>

                {calc.name === 'Pastoreio rotativo' && (
                  <Input
                    name="numeroDePiquetes"
                    color="#fff"
                    label="Número de piquetes"
                    keyboardType="numeric"
                    returnKeyType="next"
                    blurOnSubmit={false}>
                    <HelpButton data={help.numeroPiquetes} />
                  </Input>
                )}

                <SliderInput
                  label="Altura do pasto"
                  value={alturaDoPasto}
                  color="#fff"
                  mt={10}
                  onValueChange={value => {
                    setAlturaDoPasto(value);
                  }}
                  step={0.1}
                  minVal={1}
                  maxVal={maxValuesToSlider[pasture.value]}
                  unit="cm">
                  <HelpButton data={help.alturaPasto} />
                </SliderInput>
                <SliderInput
                  label="Área do potreiro"
                  value={areaDoPotreiro}
                  color="#fff"
                  mt={10}
                  onValueChange={value => {
                    setAreaDoPotreiro(value);
                  }}
                  minVal={1}
                  step={0.1}
                  maxVal={parseInt(user.property_size) || 5}
                  unit="ha">
                  <HelpButton data={help.areaDoPotreiro} />
                </SliderInput>
                <SliderInput
                  label="Período de ocupação"
                  value={tempoDePermanencia}
                  color="#fff"
                  mt={10}
                  onValueChange={value => {
                    setTempoDePermanencia(value);
                  }}
                  minVal={1}
                  maxVal={calc.name === 'Pastoreio rotativo' ? 10 : 90}
                  unit="dias">
                  <HelpButton
                    data={
                      calc.name === 'Pastoreio rotativo'
                        ? help.periodoOcupacaoR
                        : help.periodoOcupacaoC
                    }
                  />
                </SliderInput>
              </Form>
            )}

            {calc.value === 'Dimensionar área do potreiro' && (
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input
                  name="nomeDoPotreiro"
                  label="Identificação do Potreiro"
                  placeholder="Nome ou número do potreiro"
                  color="#fff"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('quantidadeDeAnimais')}>
                  <HelpButton data={help.identificacao} />
                </Input>
                <Input
                  name="dataDeInicio"
                  color="#fff"
                  label="Data de início do pastejo"
                  keyboardType="numeric"
                  placeholder="DD/MM/YYYY"
                  maskType="datetime"
                  typeIcon="datetimepicker"
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                  returnKeyType="done"
                  blurOnSubmit={true}
                />
                <Input
                  name="quantidadeDeAnimais"
                  color="#fff"
                  label="Número de animais"
                  keyboardType="numeric"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('dataDeInicio')}>
                  <HelpButton data={help.numeroAnimais} />
                </Input>

                {calc.name === 'Pastoreio rotativo' && (
                  <RadioButton
                    label="Irá fornecer suplementação adicional?"
                    onPress={value => setSuplementacaoAdicional(value)}
                    animation={true}
                    formHorizontal={true}
                    options={options}
                  />
                )}

                {suplementacaoAdicional === 1 && (
                  <>
                    <Input
                      name="racao"
                      placeholder="Ração/Concentrado (kg/animal/dia)"
                      color="#fff"
                      keyboardType="numeric"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => focusInput('feno')}>
                      <HelpButton data={help.quantidadeSuplemento} />
                    </Input>
                    <Input
                      name="feno"
                      placeholder="Feno (kg/animal/dia)"
                      color="#fff"
                      keyboardType="numeric"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => focusInput('silagem')}>
                      <HelpButton data={help.quantidadeSuplemento} />
                    </Input>
                    <Input
                      name="silagem"
                      placeholder="Silagem (kg/animal/dia)"
                      color="#fff"
                      keyboardType="numeric"
                      returnKeyType="done"
                      blurOnSubmit={true}>
                      <HelpButton data={help.quantidadeSuplemento} />
                    </Input>
                  </>
                )}
              </Form>
            )}

            {calc.value === 'Ajustar lotação animal' &&
              calc.name === 'Pastoreio contínuo' && (
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <Input
                    name="nomeDoPotreiro"
                    label="Identificação do Potreiro"
                    placeholder="Nome ou número do potreiro"
                    color="#fff"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => focusInput('quantidadeDeAnimais')}>
                    <HelpButton data={help.identificacao} />
                  </Input>
                  <Input
                    name="dataDeInicio"
                    color="#fff"
                    label="Data de início do pastejo"
                    keyboardType="numeric"
                    placeholder="DD/MM/YYYY"
                    maskType="datetime"
                    typeIcon="datetimepicker"
                    options={{
                      format: 'DD/MM/YYYY',
                    }}
                    returnKeyType="done"
                    blurOnSubmit={true}
                  />
                  <SliderInput
                    label="Altura do pasto"
                    value={alturaDoPasto}
                    color="#fff"
                    mt={10}
                    onValueChange={value => {
                      setAlturaDoPasto(value);
                    }}
                    step={0.1}
                    minVal={1}
                    maxVal={maxValuesToSlider[pasture.value]}
                    unit="cm">
                    <HelpButton data={help.alturaPasto} />
                  </SliderInput>

                  <SliderInput
                    label="Período de ocupação"
                    value={tempoDePermanencia}
                    color="#fff"
                    mt={10}
                    onValueChange={value => {
                      setTempoDePermanencia(value);
                    }}
                    minVal={1}
                    maxVal={90}
                    unit="dias">
                    <HelpButton data={help.periodoOcupacaoC} />
                  </SliderInput>

                  <SliderInput
                    label="Área do potreiro"
                    value={areaDoPotreiro}
                    color="#fff"
                    mt={10}
                    onValueChange={value => {
                      setAreaDoPotreiro(value);
                    }}
                    minVal={1}
                    step={0.1}
                    maxVal={parseInt(user.property_size) || 5}
                    unit="ha">
                    <HelpButton data={help.areaDoPotreiro} />
                  </SliderInput>
                </Form>
              )}

            {calc.name === 'Pastoreio rotativo' &&
              calc.value === 'Ajustar lotação animal' && (
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <Input
                    name="nomeDoPotreiro"
                    label="Identificação do Potreiro"
                    placeholder="Nome ou número do potreiro"
                    color="#fff"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => focusInput('quantidadeDeAnimais')}>
                    <HelpButton data={help.identificacao} />
                  </Input>
                  <Input
                    name="dataDeInicio"
                    color="#fff"
                    label="Data de início do pastejo"
                    keyboardType="numeric"
                    placeholder="DD/MM/YYYY"
                    maskType="datetime"
                    typeIcon="datetimepicker"
                    options={{
                      format: 'DD/MM/YYYY',
                    }}
                    returnKeyType="done"
                    blurOnSubmit={true}
                  />
                  <SliderInput
                    label="Altura do pasto (cm)"
                    value={alturaDoPasto}
                    color="#fff"
                    mt={10}
                    onValueChange={value => {
                      setAlturaDoPasto(value);
                    }}
                    step={0.1}
                    minVal={1}
                    maxVal={maxValuesToSlider[pasture.value]}>
                    <HelpButton data={help.alturaPasto} />
                  </SliderInput>
                  <RadioButton
                    label="Irá fornecer suplementação adicional?"
                    onPress={value => setSuplementacaoAdicional(value)}
                    animation={true}
                    formHorizontal={true}
                    options={options}
                  />

                  {suplementacaoAdicional === 1 && (
                    <>
                      <Input
                        name="racao"
                        placeholder="Ração/Concentrado (kg/animal/dia)"
                        color="#fff"
                        keyboardType="numeric"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onSubmitEditing={() => focusInput('feno')}>
                        <HelpButton data={help.quantidadeSuplemento} />
                      </Input>
                      <Input
                        name="feno"
                        placeholder="Feno (kg/animal/dia)"
                        color="#fff"
                        keyboardType="numeric"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onSubmitEditing={() => focusInput('silagem')}>
                        <HelpButton data={help.quantidadeSuplemento} />
                      </Input>
                      <Input
                        name="silagem"
                        placeholder="Silagem (kg/animal/dia)"
                        color="#fff"
                        keyboardType="numeric"
                        returnKeyType="done"
                        blurOnSubmit={true}>
                        <HelpButton data={help.quantidadeSuplemento} />
                      </Input>
                    </>
                  )}

                  <Input
                    name="numeroDePiquetes"
                    color="#fff"
                    label="Número de piquetes"
                    keyboardType="numeric"
                    returnKeyType="next"
                    blurOnSubmit={false}>
                    <HelpButton data={help.numeroPiquetes} />
                  </Input>

                  <SliderInput
                    label="Área do potreiro"
                    value={areaDoPotreiro}
                    color="#fff"
                    mt={10}
                    onValueChange={value => {
                      setAreaDoPotreiro(value);
                    }}
                    minVal={1}
                    step={0.1}
                    maxVal={parseInt(user.property_size) || 5}
                    unit="ha">
                    <HelpButton data={help.areaDoPotreiro} />
                  </SliderInput>
                </Form>
              )}

            {calc.value === 'Calcular número de piquetes' && (
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input
                  name="nomeDoPotreiro"
                  label="Identificação do Potreiro"
                  placeholder="Nome ou número do potreiro"
                  color="#fff"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('quantidadeDeAnimais')}>
                  <HelpButton data={help.identificacao} />
                </Input>
                <Input
                  name="dataDeInicio"
                  color="#fff"
                  label="Data de início do pastejo"
                  keyboardType="numeric"
                  placeholder="DD/MM/YYYY"
                  maskType="datetime"
                  typeIcon="datetimepicker"
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                  returnKeyType="done"
                  blurOnSubmit={true}
                />
                <Input
                  name="quantidadeDeAnimais"
                  color="#fff"
                  label="Número de animais"
                  keyboardType="numeric"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('dataDeInicio')}>
                  <HelpButton data={help.numeroAnimais} />
                </Input>

                <SliderInput
                  label="Área do potreiro"
                  value={areaDoPotreiro}
                  color="#fff"
                  mt={10}
                  onValueChange={value => {
                    setAreaDoPotreiro(value);
                  }}
                  step={0.1}
                  minVal={1}
                  maxVal={parseInt(user.property_size) || 5}
                  unit="ha">
                  <HelpButton data={help.areaDoPotreiro} />
                </SliderInput>

                <RadioButton
                  label="Irá fornecer suplementação adicional?"
                  onPress={value => setSuplementacaoAdicional(value)}
                  animation={true}
                  formHorizontal={true}
                  options={options}
                />

                {suplementacaoAdicional === 1 && (
                  <>
                    <Input
                      name="racao"
                      placeholder="Ração/Concentrado (kg/animal/dia)"
                      color="#fff"
                      keyboardType="numeric"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => focusInput('feno')}>
                      <HelpButton data={help.quantidadeSuplemento} />
                    </Input>
                    <Input
                      name="feno"
                      placeholder="Feno (kg/animal/dia)"
                      color="#fff"
                      keyboardType="numeric"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => focusInput('silagem')}>
                      <HelpButton data={help.quantidadeSuplemento} />
                    </Input>
                    <Input
                      name="silagem"
                      placeholder="Silagem (kg/animal/dia)"
                      color="#fff"
                      keyboardType="numeric"
                      returnKeyType="done"
                      blurOnSubmit={true}>
                      <HelpButton data={help.quantidadeSuplemento} />
                    </Input>
                  </>
                )}
              </Form>
            )}

            {calc.value === 'Definir período de ocupação' && (
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input
                  name="nomeDoPotreiro"
                  label="Identificação do Potreiro"
                  placeholder="Nome ou número do potreiro"
                  color="#fff"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('quantidadeDeAnimais')}>
                  <HelpButton data={help.identificacao} />
                </Input>
                <Input
                  name="dataDeInicio"
                  color="#fff"
                  label="Data de início do pastejo"
                  keyboardType="numeric"
                  placeholder="DD/MM/YYYY"
                  maskType="datetime"
                  typeIcon="datetimepicker"
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                  returnKeyType="done"
                  blurOnSubmit={true}
                />
                <Input
                  name="quantidadeDeAnimais"
                  color="#fff"
                  label="Número de animais"
                  keyboardType="numeric"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => focusInput('dataDeInicio')}>
                  <HelpButton data={help.numeroAnimais} />
                </Input>

                <SliderInput
                  label="Altura do pasto"
                  value={alturaDoPasto}
                  color="#fff"
                  mt={10}
                  onValueChange={value => {
                    setAlturaDoPasto(value);
                  }}
                  step={0.1}
                  minVal={1}
                  maxVal={maxValuesToSlider[pasture.value]}
                  unit="cm">
                  <HelpButton data={help.alturaPasto} />
                </SliderInput>

                <Input
                  name="numeroDePiquetes"
                  color="#fff"
                  label="Número de piquetes"
                  keyboardType="numeric"
                  returnKeyType="next"
                  blurOnSubmit={false}>
                  <HelpButton data={help.numeroPiquetes} />
                </Input>

                <SliderInput
                  label="Área do potreiro"
                  value={areaDoPotreiro}
                  color="#fff"
                  mt={10}
                  onValueChange={value => {
                    setAreaDoPotreiro(value);
                  }}
                  minVal={1}
                  step={0.1}
                  maxVal={parseInt(user.property_size) || 5}
                  unit="ha">
                  <HelpButton data={help.areaDoPotreiro} />
                </SliderInput>

                <RadioButton
                  label="Irá fornecer suplementação adicional?"
                  onPress={value => setSuplementacaoAdicional(value)}
                  animation={true}
                  formHorizontal={true}
                  options={options}
                />

                {suplementacaoAdicional === 1 && (
                  <>
                    <Input
                      name="racao"
                      placeholder="Ração/Concentrado (kg/animal/dia)"
                      color="#fff"
                      keyboardType="numeric"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => focusInput('feno')}>
                      <HelpButton data={help.quantidadeSuplemento} />
                    </Input>
                    <Input
                      name="feno"
                      placeholder="Feno (kg/animal/dia)"
                      color="#fff"
                      keyboardType="numeric"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => focusInput('silagem')}>
                      <HelpButton data={help.quantidadeSuplemento} />
                    </Input>
                    <Input
                      name="silagem"
                      placeholder="Silagem (kg/animal/dia)"
                      color="#fff"
                      keyboardType="numeric"
                      returnKeyType="done"
                      blurOnSubmit={true}>
                      <HelpButton data={help.quantidadeSuplemento} />
                    </Input>
                  </>
                )}
              </Form>
            )}
            <Button
              content="Finalizar"
              mt="20px"
              mb="40px"
              color="#D69D2B"
              onPress={() => formRef.current.submitForm()}
            />
          </Content>
        </View>
      </View>
    </Container>
  );
};

export default FormContainer;
