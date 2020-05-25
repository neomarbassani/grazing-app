/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ActivityIndicator } from 'react-native';

import {
  Container,
  ResultBox,
  CategoryItem,
  CowContainer,
  CowImage,
  DateGroup,
  DateItem,
  Group,
  Item,
  MiddleSection,
  ResultTextContent,
  ResultTextTitle,
  TitleItem,
  NoContentText,
} from './styles';

import api from '../../services/api';

import cowImage from '../../assets/cow.png';

import CalcHistoryActions from '../../store/ducks/calcHistory';

const HistoricFlatlist = ({ navigation }) => {
  const [historic, setHistoric] = useState([]);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { isConnected } = useSelector((state) => state.offline);

  const { calcState } = useSelector((state) => state.calcHistory.calcState);

  const getHistoric = async () => {
    const response = await api.get(
      `history?perPage=10&page=${page}&grouped=true`,
    );

    return response.data.data;
  };

  const setInnitialHictoricArray = async () => {
    if (isConnected) {
      const historyArray = await getHistoric();

      setHistoric(historyArray);

      dispatch(CalcHistoryActions.addOfflineCalcToHistoryRequest(historyArray));
    }
  };

  /*const handleRefreshHistory = async () => {
    if (isConnected) {
      setPage(page + 1);

      const historyArray = await getHistoric();

      setHistoric([...historic, historyArray]);
    }
  };*/

  useEffect(() => {
    setInnitialHictoricArray();
  }, []);

  function formateDate(str) {
    var mouthArray = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    const date = new Date(str);
    const day = date.getUTCDay();
    const mouthParse = date.getUTCMonth();

    return `${day} de ${mouthArray[mouthParse]}`;
  }

  return (
    <Container
      data={isConnected ? historic : calcState}
      ListEmptyComponent={() => <NoContentText>Não há items</NoContentText>}
      // ListFooterComponent={() => (
      //  <NoContentText>Deslize para carregar mais</NoContentText>
      // )}
      // onEndReached={handleRefreshHistory}
      // onEndReachedThreshold={0.1}
      renderItem={({ item }) => (
        <Group>
          <DateGroup>{formateDate(item.created_at)}</DateGroup>
          {item.calcs.map((historicItem) => (
            <Item
              key={historicItem._id}
              onPress={() =>
                navigation.navigate('HistoricItemDetails', {
                  itemId: historicItem._id,
                })
              }>
              <CowContainer>
                <CowImage source={cowImage} />
              </CowContainer>
              <MiddleSection>
                <TitleItem>{historicItem.config.animal.name}</TitleItem>
                <CategoryItem>{historicItem.config.animal.value}</CategoryItem>
                <ResultBox>
                  <ResultTextTitle>Resultado:</ResultTextTitle>
                  <ResultTextContent>
                    {historicItem.results[0].value} Animais
                  </ResultTextContent>
                </ResultBox>
              </MiddleSection>
              <DateItem>{historicItem.created_at_formatted}</DateItem>
            </Item>
          ))}
        </Group>
      )}
      keyExtractor={(item) => item.created_at}
    />
  );
};

export default HistoricFlatlist;
