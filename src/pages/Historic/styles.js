import styled from 'styled-components/native';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

import {colors} from '../../styles';

export const Header = styled.View`
  flex-direction: row;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;

export const FlatListContainer = styled.FlatList`
  width: 100%;
  padding: 0 15px 10px 15px;
  margin-bottom: 30px;
`;

export const DateGroup = styled.Text`
  font-family: 'WorkSans-Bold';
  font-size: 16px;
  font-weight: bold;
  align-self: flex-start;
  color: #774d37;
  margin: 20px 0px;
`;

export const Group = styled.View``;

export const Item = styled.TouchableOpacity`
  height: 70px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #e6e6e6;
  margin: 10px 0;
  padding: 0 0 15px 0;
`;

export const MiddleSection = styled.View`
  margin-left: 8px;
  justify-content: space-between;
  height: 60px;
`;

export const DateItem = styled.Text`
  font-family: 'WorkSans';
  font-size: 14px;
  line-height: 16px;
  color: #c4c4c4;
  position: absolute;
  top: 0;
  right: 0;
`;

export const CowContainer = styled.View`
  width: 60px;
  height: 60px;
  background: #774d37;
  border-radius: 5px;

  align-items: center;
  justify-content: center;
`;

export const CowImage = styled.Image`
  width: 32px;
`;

export const TitleItem = styled.Text`
  font-family: 'WorkSans-Bold';
  font-size: 12px;
  line-height: 14px;
  color: #774d37;
`;

export const CategoryItem = styled.Text`
  font-family: 'WorkSans';
  font-size: 12px;
  line-height: 14px;
  color: #d09776;
`;

export const ResultBox = styled.View`
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  flex-direction: row;
  background: #d69d2b;
  border-radius: 100px;
`;

export const ResultTextTitle = styled.Text`
  font-family: 'WorkSans';
  font-size: 12px;
  line-height: 14px;
  color: #774d37;
  margin-right: 10px;
`;

export const ResultTextContent = styled.Text`
  font-family: 'WorkSans-Bold';
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
`;

export const NoContentText = styled.Text`
  font-family: 'WorkSans';
  font-size: 18px;

  color: #774d37;
  align-self: center;
  margin-top: 20px;
`;

export const InputPickerContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  width: 45%;
  justify-content: space-between;
  align-items: center;
`;

export const InputPicker = styled(Picker)`
  width: 110%;
  height: 42px;
  color: ${colors.placeholder};
  background-color: transparent;
`;

export const InputFieldItem = styled(Picker.Item)``;

export const InputPickerIcon = styled(Icon)`
  position: absolute;
  right: 0%;
`;

export const BackButton = styled(Icon)``;

export const LoadMoreItemsText = styled.Text`
  font-family: 'WorkSans';

  font-size: 18px;
  text-align: center;
  color: #888899;
  margin: 10px 0;
`;

export const ModalContainer = styled(Modal)`
  position: absolute;
  bottom: -21px;
  left: -21px;
  width: 100%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: #fff;
`;

export const ModalContent = styled.View`
  flex: 1;
  margin: 23px 20px;
  align-items: center;
`;

export const ModalContainerTitle = styled.Text`
  font-family: 'WorkSans';
  font-weight: bold;
  font-size: ${props => (props.size ? props.size : 0)}px;
  color: #281100;
  margin-top: ${props => (props.mt ? props.mt : 0)}px;
  margin-bottom: ${props => (props.mb ? props.mb : 0)}px;
  align-self: ${props => (props.alignSelf ? props.alignSelf : 'center')};
`;

export const ModalContainerDateTime = styled.Text`
  font-family: 'WorkSans';
  font-size: 14px;
  text-align: center;
  color: #d09776;
  margin-top: 8px;
`;

export const ModalContainerCloseButton = styled(Icon)`
  position: absolute;
  top: 0;
  right: 0;
`;

export const RowItem = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Label = styled.Text`
  font-family: 'WorkSans-Bold';
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #774d37;
`;

export const Value = styled.Text`
  font-family: 'WorkSans';
  font-size: 12px;
  text-align: right;
  color: #d09776;
`;

export const Separator = styled.View`
  width: 100%;
  height: 2px;
  background: #e6e6e6;
`;

export const ResultBoxModal = styled.View`
  width: 100%;
  padding: 18px 65px;
  background: #281100;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  align-items: center;
`;

export const ResultBoxModalTitle = styled.Text`
  font-family: 'WorkSans-Bold';
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
`;

export const ResultBoxModalValue = styled.Text`
  font-family: 'WorkSans-Bold';
  font-weight: bold;
  font-size: 68px;
  color: #d69d2b;
`;
