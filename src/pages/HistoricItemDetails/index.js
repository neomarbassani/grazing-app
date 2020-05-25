/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Container, Field, Label, Title } from './styles';
import { useSelector } from 'react-redux';

import api from '../../services/api';

const HistoricItemDetails = ({ navigation }) => {
  const [historicItem, setHistoricItem] = useState();

  const { itemId } = navigation.state.params;

  const { isConnected } = useSelector((state) => state.offline);

  const getHistoricItem = async () => {
    const response = await api.get(`history/${itemId}`);
    setHistoricItem(response.data);
  };

  useEffect(() => {
    getHistoricItem();
  });

  return isConnected ? (
    <Container>
      <Title>Configurações</Title>
      <Label>Tipo de cálculo</Label>
      <Field>{historicItem && historicItem.config.calc.value}</Field>
      <Label>Tipo de Animal</Label>
      <Field>{historicItem && historicItem.config.animal.value}</Field>
      <Label>Tipo de pastagem</Label>
      <Field>{historicItem && historicItem.config.pasture.value}</Field>

      <Title>Inputs</Title>
      {historicItem &&
        historicItem.inputs.map((item) => (
          <>
            <Label>{item.name}</Label>
            <Field>{item.value}</Field>
          </>
        ))}

      <Title>Resultados</Title>
      {historicItem &&
        historicItem.results.map((item) => (
          <>
            <Label>{item.name}</Label>
            <Field>{item.value}</Field>
          </>
        ))}
    </Container>
  ) : (
    <Title style={{ alignSelf: 'center' }}>Seu dispositivo está offline</Title>
  );
};

export default HistoricItemDetails;
