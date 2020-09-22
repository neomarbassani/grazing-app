import styled from 'styled-components/native';

import Slider from 'react-native-slider';

export const Container = styled.View`
  flex: 1;
  margin-top: ${props => (props.mt ? props.mt : 0)}px;
  margin-bottom: ${props => (props.mb ? props.mb : 0)}px;
`;

export const Label = styled.Text`
  font-family: 'WorkSans';
  font-style: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${props => (props.color ? props.color : '#888899')};
  margin-bottom: 15px;
`;

export const SliderComponent = styled(Slider)``;

export const RangeBox = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const RangeValue = styled(Label)``;
