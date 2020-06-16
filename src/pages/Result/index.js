import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StatusBar} from 'react-native';

import backgroundResult from '../../assets/backgroundResult.png';
import logoResults from '../../assets/logoResults.png';

import CalcHistoryActions from '../../store/ducks/calcHistory';

import {
  Container,
  ContainerBackground,
  Logo,
  ResultBox,
  ResultBoxTitle,
  ResultText,
  Link,
} from './styles';

const Result = ({navigation}) => {
  const calcState = useSelector(state => state.calc);

  function handleSaveHistory() {
    dispatch(CalcHistoryActions.addCalcToHistoryRequest(calcState));
    navigation.navigate('Home');
  }

  const dispatch = useDispatch();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#281100"
        translucent={true}
      />
      <ContainerBackground source={backgroundResult}>
        <Container>
          <Logo source={logoResults} />
          <ResultBoxTitle>Seu resultado foi:</ResultBoxTitle>
          <ResultBox>
            <ResultText>{calcState.results[0].value} animais</ResultText>
          </ResultBox>
          <Link onPress={handleSaveHistory}>Ir para a tela inicial</Link>
        </Container>
      </ContainerBackground>
    </>
  );
};

export default Result;
