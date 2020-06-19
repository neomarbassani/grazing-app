import styled from 'styled-components/native';

import {colors} from '../../styles';

export const Content = styled.ScrollView`
  width: 100%;
`;

export const PhotoContainer = styled.View`
  align-self: center;
  margin-top: 50px;
`;

export const ChangePhotoButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #d69d2b;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
`;

export const UserNameField = styled.Text`
  font-family: 'WorkSans-Bold';
  font-size: 16px;
  line-height: 19px;
  margin-top: 10px;
  color: #888899;
`;

export const SectionTitle = styled.Text`
  font-family: 'WorkSans-Bold';
  font-size: 16px;
  line-height: 19px;
  margin-top: 10px;
  color: ${colors.link};
  margin-bottom: 16px;
`;

export const FormArea = styled.View`
  margin-top: 20px;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
