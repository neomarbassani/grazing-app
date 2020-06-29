import styled from 'styled-components/native';

import Slider from '@react-native-community/slider';

export const Container = styled.View`
  width: 100%;
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

export const SliderComponent = styled(Slider)`
  width: 100%;
  height: 20px;
`;

export const RangeBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const RangeValue = styled(Label)``;
