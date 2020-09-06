import React from 'react';

import { View } from 'react-native';

import {
  Container,
  Label,
  SliderComponent,
  RangeBox,
  RangeValue
} from './styles';

const SliderInput = ({
  label,
  mt,
  mb,
  minVal,
  maxVal,
  value,
  color,
  step,
  unit,
  children,
  error,
  ...rest
}) => {
  return (
    <Container mt={mt} mb={mb}>    
      <RangeBox>
        <Label color={color}>
          {label}: {(step < 1 ? value.toFixed(1) : value)} {unit}
        </Label>
        <View style={{marginRight: 10}}>{children && children}</View>
      </RangeBox>
      
      <SliderComponent
        minimumTrackTintColor="#774D37"
        maximumTrackTintColor="#CCCCCC"
        minimumValue={minVal}
        maximumValue={maxVal}
        thumbTintColor="#D69D00" 
        step={step ? step : 1}
        {...rest}
      />
      <RangeBox>
        <RangeValue color={color}>{minVal}</RangeValue>
        <RangeValue color={color}>{maxVal}</RangeValue>
      </RangeBox>
      {error && <InputError>{error}</InputError>}
    </Container>
  );
};

export default SliderInput;
