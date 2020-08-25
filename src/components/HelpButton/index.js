/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Container,
  ModalContainer,
  ModalText,
  ModalTitle,
  Letter
} from './styles';
import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/Feather';

import {TouchableOpacity} from 'react-native';

const HelpButton = ({data, ...rest}) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <Container {...rest} onPress={() => setIsVisible(true)}>
        <Letter>i</Letter>
      </Container>
      <Modal isVisible={isVisible} >
          <TouchableOpacity
            style={{
              marginLeft: 'auto',
              marginEnd: 10,
              marginBottom: 10
            }}
          >
            <Icon name="x" size={25} onPress={() => setIsVisible(false)} style={{color: '#fff'}}/>
          </TouchableOpacity>
        <ModalContainer>
          <ModalTitle onPress={() => setIsVisible(false)}>{data.title}</ModalTitle>
          <ModalText onPress={() => setIsVisible(false)}>{data.content}</ModalText>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default HelpButton;
