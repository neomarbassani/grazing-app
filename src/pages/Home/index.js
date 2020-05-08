import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  console.log(user);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hello {user.name}</Text>
    </View>
  );
};

export default Home;
