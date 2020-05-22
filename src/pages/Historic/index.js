import React from 'react';

import Container from '../../layout/App/Container';

import Title from '../../components/Title';
import HistoricFilter from '../../components/HistoricFilter';
import HistoricFlatlist from '../../components/HistoricFlatlist';

const Profile = () => {
  return (
    <Container>
      <Title size={24} value="Histórico" />
      <HistoricFilter />
      <HistoricFlatlist />
    </Container>
  );
};

export default Profile;
