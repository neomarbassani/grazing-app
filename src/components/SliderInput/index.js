import React from 'react';

import {
  Container,
  Label,
  SliderComponent,
  RangeBox,
  RangeValue,
} from './styles';

const SliderInput = ({
  label,
  mt,
  mb,
  minVal,
  maxVal,
  value,
  color,
  ...rest
}) => {
  return (
    <Container mt={mt} mb={mb}>
      <Label color={color}>
        {label}: {value}
      </Label>
      <SliderComponent
        minimumTrackTintColor="#774D37"
        maximumTrackTintColor="#CCCCCC"
        minimumValue={minVal}
        maximumValue={maxVal}
        thumbTintColor="#D69D2B"
        step={1}
        {...rest}
      />
      <RangeBox>
        <RangeValue color={color}>{minVal}</RangeValue>
        <RangeValue color={color}>{maxVal}</RangeValue>
      </RangeBox>
    </Container>
  );
};

export default SliderInput;
