import React from 'react';
import {useDispatch} from 'react-redux';
import Snackbar from 'react-native-snackbar';

import CalcHistoryActions from '../../store/ducks/calcHistory';

import Container from '../../layout/App';

import ProgressBar from '../../components/ProgressBar';
import CalcHeader from '../../components/CalcHeader';
import Button from '../../components/Button';

import logo from '../../assets/logoResults.png';

import {Description, ResultText, Title, Logo, Content} from './styles';

const Result = ({navigation, route}) => {
  const calcState = route.params;

  const dispatch = useDispatch();

  const saveCalc = async () => {
    try {
      dispatch(CalcHistoryActions.addCalcToHistoryRequest(calcState));
      Snackbar.show({
        text: 'Salvo com sucesso.',
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#fff',
        backgroundColor: '#008000',
      });
      navigation.navigate('Home');
    } catch (error) {
      Snackbar.show({
        text: 'Erro ao salvar, tente novamente.',
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#fff',
        backgroundColor: '#ff0000',
        action: {
          text: 'TENTAR NOVAMENTE',
          textColor: 'white',
          onPress: () => {
            saveCalc();
          },
        },
      });
    }
  };

  return (
    <Container results>
      <ProgressBar size={100} />
      <CalcHeader color="#fff" />
      <Content>
        <Logo source={logo} />
        <Title>Resultado</Title>
        {calcState.results.map(result => (
          <>
            <Description>{result.name}</Description>
            <ResultText
              size={
                result.value ===
                  'Não há necessidade de suplementar os animais' && '21px'
              }>
              {result.value}
            </ResultText>
          </>
        ))}
        <Button content="Voltar ao início" mt="auto" onPress={saveCalc} />
      </Content>
    </Container>
  );
};

export default Result;
