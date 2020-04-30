import styled from 'styled-components/native';

import { heightPercentageToDP } from '../../config/PixelRatio';
import { colors } from '../../styles';

export const BoxTitle = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${(props) => (props.mt ? props.mt : 0)}px;
`;

export const Text = styled.Text`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: bold;
  font-size: ${(props) =>
    props.size ? props.size : heightPercentageToDP('3.1%')}px;
  line-height: ${heightPercentageToDP('3.73%')}px;
  color: ${colors.title};
  margin-bottom: ${heightPercentageToDP('0.8%')}px;
  margin-left: ${(props) => (props.ml ? props.ml : 0)}px;
`;
