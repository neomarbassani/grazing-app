/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView } from 'react-native';

const Background = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#281100' }}>
      {children}
    </SafeAreaView>
  );
};

export default Background;
