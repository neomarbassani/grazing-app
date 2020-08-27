import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Snackbar from 'react-native-snackbar';

import CalcHistoryActions from '../../store/ducks/calcHistory';

import Container from '../../layout/App';

import ProgressBar from '../../components/ProgressBar';
import CalcHeader from '../../components/CalcHeader';
import Button from '../../components/Button';

import logo from '../../assets/logoResults.png';

import {Description, ResultText, Title, Logo, Content} from './styles';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const Result = ({navigation, route}) => {
  const calcState = route.params;

  const dispatch = useDispatch();
  const isActive = useIsFocused();

  useEffect(() => {
    if(!isActive) return
    
    dispatch(CalcHistoryActions.addCalcToHistoryRequest(calcState));
  }, [isActive])

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
            <ResultText>
              {result.value}
            </ResultText>
          </>
        ))}
        <View style={{
          marginBottom: 40
        }}>
          <Button content="Voltar ao início" onPress={() => {navigation.navigate('Home')}} />
        </View>
      </Content>
    </Container>
  );
};

export default Result;
