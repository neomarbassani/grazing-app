import React from 'react';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';

import Container from '../../layout/App/Container';

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <Container>
      <Text>Hello {user.name} voce esta no Home</Text>
    </Container>
  );
};

export default Home;
