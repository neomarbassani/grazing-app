import styled, {css} from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  margin-left: -5px;

  width: 27px;
  height: 27px;

  border-radius: 100px;

  background: #c4c4c4;

  ${({card}) => {
    if (card) {
      return css`
        position: absolute;
        top: 10px;
        right: 10px;
      `;
    }
  }};
`;

export const Letter = styled.Text`
  font-family: 'WorkSans-Bold';
  font-style: italic;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;

  color: #ffffff;
`;

export const ModalContainer = styled.View`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
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
