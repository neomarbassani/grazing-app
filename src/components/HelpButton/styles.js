import styled, {css} from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  background-color: #c94324;
  border-radius: 100px;
  width: 25px;
  height: 25px;

  margin-left: -5px;

  ${({card}) => {
    if (card) {
      return css`
        position: absolute;
        top: 10px;
        right: 10px;
      `;
    }
  }}
`;

export const Icon = styled.Text`
  font-family: 'WorkSans-Bold';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;

  color: #ffffff;
`;

export const ModalContainer = styled.View`
  padding: 20px;
  background-color: #fff;
  border-radius: 7px;
`;

export const ModalText = styled.Text`
  font-family: 'WorkSans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;

  text-align: center;

  color: #888899;
`;

export const ModalTitle = styled.Text`
  font-family: 'WorkSans-Bold';
  font-style: normal;
  font-weight: bold;
  font-size: 21px;

  text-align: center;

  color: #888899;

  margin-bottom: 20px;
`;
