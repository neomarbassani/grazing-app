import React from 'react';

import {
  Container,
  Label,
  SliderComponent,
  RangeBox,
  RangeValue,
} from './styles';

const SliderInput = ({label, mt, mb, minVal, maxVal, value, ...rest}) => {
  return (
    <Container mt={mt} mb={mb}>
      <Label>
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
        <RangeValue>{minVal}</RangeValue>
        <RangeValue>{maxVal}</RangeValue>
      </RangeBox>
    </Container>
  );
};

export default SliderInput;
