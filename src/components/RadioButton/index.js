/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

const RadioButton = ({label, options, onPress, ...rest}) => {
  return (
    <View style={{width: '100%', marginBottom: 20}}>
      <Text style={{color: '#fff', marginBottom: 10}}>{label}</Text>
      <RadioForm
        radio_props={options}
        initial={1}
        formHorizontal={true}
        labelHorizontal={true}
        buttonColor="#C94324"
        selectedButtonColor="#C94324"
        selectedLabelColor="#fff"
        labelColor="#fff"
        animation={true}
        buttonStyle={{marginRight: 10}}
        onPress={onPress}
        style={{width: '70%', justifyContent: 'space-between'}}
        {...rest}
      />
    </View>
  );
};

export default RadioButton;
