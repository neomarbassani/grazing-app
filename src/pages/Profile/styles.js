import styled from 'styled-components/native';

import { colors } from '../../styles';

export const TopContent = styled.View`
  margin-top: 30px;
  align-items: center;
`;

export const Content = styled.View`
  margin-top: 30px;
  align-items: flex-start;
  flex: 1;
`;

export const PhotoContainer = styled.View``;

export const ProfilePhoto = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
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
