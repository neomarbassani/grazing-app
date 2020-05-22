import React from 'react';

import Container from '../../layout/App/Container';

import Title from '../../components/Title';
import HistoricFilter from '../../components/HistoricFilter';

const Profile = () => {
  return (
    <Container>
      <Title size={24} value="Histórico" />
      <HistoricFilter />
    </Container>
  );
};

export default Profile;
