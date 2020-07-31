/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
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

import {Content} from './styles';

const AnimalInfo = ({navigation, route}) => {
  const {calc, animal} = route.params;

  const items = [calc.value, calc.name, animal.value];

  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      if (
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
              value: data.weeksOfLactation || 0,
              key: 'weeksOfLactation',
            },
            {
              name: 'Produção de Leite (litros/dia)',
              value: data.milkQuantity || 0,
              key: 'milkQuantity',
            },
            {
              name: 'N° de dias de gestação',
              value: data.daysOfLactation || 0,
              key: 'daysOfLactation',
            },
          ],
        });
      }

      if (
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
              name: 'Semanas de Lactação',
              value: data.weeksOfLactation || 0,
              key: 'weeksOfLactation',
            },
            {
              name: 'Produção de Leite (litros/dia)',
              value: data.milkQuantity || 0,
              key: 'milkQuantity',
            },
            {
              name: 'N° de dias de gestação',
              value: data.daysOfLactation || 0,
              key: 'daysOfLactation',
            },
          ],
        });
      }

      if (
        calc.value === 'Ajustar lotação animal' &&
        animal.name === 'Bovinocultura de corte'
      ) {
        const schema = Yup.object().shape({
          weigth: Yup.string().required('Insira o peso médio dos animais'),
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
              value: data.weeksOfLactation || 0,
              key: 'weeksOfLactation',
            },
            {
              name: 'Produção de Leite (litros/dia)',
              value: data.milkQuantity || 0,
              key: 'milkQuantity',
            },
            {
              name: 'N° de dias de gestação',
              value: data.daysOfLactation || 0,
              key: 'daysOfLactation',
            },
          ],
        });
      }

      if (calc.value === 'Dimensionar área do potreiro') {
        const schema = Yup.object().shape({
          weigth: Yup.string().required('Insira o peso médio dos animais'),
          animalsAmount: Yup.string().required('Insira o número de animais'),
          rationAmount: Yup.string(),
          silageAmount: Yup.string(),
          hayAmount: Yup.string(),
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
            {
              name: 'Os animais irão receber ração no cocho? Se sim, quanto?',
              value: data.rationAmount || 0,
              key: 'rationAmount',
            },
            {
              name: 'Os animais irão receber silagem? Se sim, quanto?',
              value: data.silageAmount || 0,
              key: 'silageAmount',
            },
            {
              name: 'Os animais irão receber feno? Se sim, quanto?',
              value: data.hayAmount || 0,
              key: 'hayAmount',
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
            {
              name: 'Semanas de Lactação',
              value: data.weeksOfLactation || 0,
              key: 'weeksOfLactation',
            },
            {
              name: 'Produção de Leite (litros/dia)',
              value: data.milkQuantity || 0,
              key: 'milkQuantity',
            },
            {
              name: 'N° de dias de gestação',
              value: data.daysOfLactation || 0,
              key: 'daysOfLactation',
            },
          ],
        });
      }

      if (
        calc.name === 'Pastoreio rotativo' &&
        calc.value === 'Fornecer suplemento'
      ) {
        const schema = Yup.object().shape({
          weigth: Yup.string().required('Insira o peso médio dos animais'),
          animalsAmount: Yup.string().required('Insira o número de animais'),
          daysOfStay: Yup.string().required('Insira os dias de permanência'),
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
            {
              name: 'Nº dias de permanência dos animais em cada faixa',
              value: data.daysOfStay,
              key: 'daysOfStay',
            },
            {
              name: 'Semanas de Lactação',
              value: data.weeksOfLactation || 0,
              key: 'weeksOfLactation',
            },
            {
              name: 'Produção de Leite (litros/dia)',
              value: data.milkQuantity || 0,
              key: 'milkQuantity',
            },
            {
              name: 'N° de dias de gestação',
              value: data.daysOfLactation || 0,
              key: 'daysOfLactation',
            },
          ],
        });
      }

      if (
        calc.name === 'Pastoreio rotativo' &&
        calc.value === 'Calcular números de piquetes'
      ) {
        const schema = Yup.object().shape({
          weigth: Yup.string().required('Insira o peso médio dos animais'),
          animalsAmount: Yup.string().required('Insira o número de animais'),
          feedInTheTrough: Yup.string(),
          receivingSilageOrHay: Yup.string(),
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
            {
              name:
                'Os animais irão receber ração no cocho? Se sim, quanto? (em kg MS/animal/dia)',
              value: data.feedInTheTrough,
              key: 'feedInTheTrough',
            },
            {
              name:
                'Os animais irão receber silagem ou feno? Se sim, quanto? (em kg/animal/dia)',
              value: data.receivingSilageOrHay,
              key: 'receivingSilageOrHay',
            },
            {
              name: 'Semanas de Lactação',
              value: data.weeksOfLactation || 0,
              key: 'weeksOfLactation',
            },
            {
              name: 'Produção de Leite (litros/dia)',
              value: data.milkQuantity || 0,
              key: 'milkQuantity',
            },
            {
              name: 'N° de dias de gestação',
              value: data.daysOfLactation || 0,
              key: 'daysOfLactation',
            },
          ],
        });
      }

      if (
        calc.name === 'Pastoreio rotativo' &&
        calc.value === 'Definir período de ocupação'
      ) {
        const schema = Yup.object().shape({
          weigth: Yup.string().required('Insira o peso médio dos animais'),
          animalsAmount: Yup.string().required('Insira o número de animais'),
          rationAmount: Yup.string(),
          silageAmount: Yup.string(),
          hayAmount: Yup.string(),
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
            {
              name: 'Semanas de Lactação',
              value: data.weeksOfLactation || 0,
              key: 'weeksOfLactation',
            },
            {
              name: 'Produção de Leite (litros/dia)',
              value: data.milkQuantity || 0,
              key: 'milkQuantity',
            },
            {
              name: 'N° de dias de gestação',
              value: data.daysOfLactation || 0,
              key: 'daysOfLactation',
            },
            {
              name: 'Os animais irão receber ração no cocho? Se sim, quanto?',
              value: data.rationAmount || 0,
              key: 'rationAmount',
            },
            {
              name: 'Os animais irão receber silagem? Se sim, quanto?',
              value: data.silageAmount || 0,
              key: 'silageAmount',
            },
            {
              name: 'Os animais irão receber feno? Se sim, quanto?',
              value: data.hayAmount || 0,
              key: 'hayAmount',
            },
          ],
        });
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
          {calc.value === 'Ajustar lotação animal' && (
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
                    label="Os animais irão receber silagem? Se sim, quanto?"
                    keyboardType="numeric"
                    placeholder="kg/animal/dia"
                  />
                  <Input
                    name="hayAmount"
                    label="Os animais irão receber  feno? Se sim, quanto?"
                    keyboardType="numeric"
                    placeholder="kg/animal/dia"
                  />
                </>
              )}
            </>
          )}
          {calc.name === 'Pastoreio contínuo' &&
            calc.value === 'Fornecer suplemento' && (
              <>
                <Input
                  name="animalsAmount"
                  label="Número de animais que serão colocados no potreiro"
                  keyboardType="numeric"
                  placeholder="Insira o número de animais"
                />

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
          {calc.name === 'Pastoreio rotativo' &&
            calc.value === 'Fornecer suplemento' && (
              <>
                <Input
                  name="animalsAmount"
                  label="Número de animais que serão colocados no potreiro"
                  keyboardType="numeric"
                  placeholder="Insira o número de animais"
                />
                <Input
                  name="daysOfStay"
                  label="Nº dias de permanência dos animais em cada faixa"
                  keyboardType="numeric"
                  placeholder="Insira o número de animais"
                />
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
          {calc.value === 'Calcular números de piquetes' && (
            <>
              <Input
                name="animalsAmount"
                label="Número de animais que serão colocados no potreiro"
                keyboardType="numeric"
                placeholder="Insira o número de animais"
              />
              <Input
                name="feedInTheTrough"
                label="Os animais irão receber ração no cocho? Se sim, quanto? (em kg MS/animal/dia)"
                keyboardType="numeric"
                placeholder="Insira um valor"
              />
              <Input
                name="receivingSilageOrHay"
                label="Os animais irão receber silagem ou feno? Se sim, quanto? (em kg/animal/dia)"
                keyboardType="numeric"
                placeholder="Insira um valor"
              />
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
          {calc.value === 'Definir período de ocupação' && (
            <>
              <Input
                name="animalsAmount"
                label="Número de animais que serão colocados no potreiro"
                keyboardType="numeric"
                placeholder="Insira o número de animais"
              />

              <Input
                name="rationAmount"
                label="Os animais irão receber ração no cocho? Se sim, quanto?"
                keyboardType="numeric"
                placeholder="kg MS/animal/dia"
                mb={60}
              />
              <Input
                name="silageAmount"
                label="Os animais irão receber silagem? Se sim, quanto?"
                keyboardType="numeric"
                placeholder="kg/animal/dia"
              />
              <Input
                name="hayAmount"
                label="Os animais irão receber  feno? Se sim, quanto?"
                keyboardType="numeric"
                placeholder="kg/animal/dia"
              />

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
