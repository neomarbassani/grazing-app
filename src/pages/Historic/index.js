import React from 'react';

import Container from '../../layout/App';

import Title from '../../components/Title';
import HistoricFilter from '../../components/HistoricFilter';
import HistoricFlatlist from '../../components/HistoricFlatlist';

const Profile = ({ navigation }) => {
  return (
    <Container>
      <Title size={24} value="Histórico" />
      <HistoricFilter />
      <HistoricFlatlist navigation={navigation} />
    </Container>
  );
};

export default Profile;
