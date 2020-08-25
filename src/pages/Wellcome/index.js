import React from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Link from '../../components/Link';
import Button from '../../components/Button';

import backgroundImage1 from '../../assets/loading1.jpg';
import backgroundImage2 from '../../assets/loading2.jpg';
import backgroundImage3 from '../../assets/loading3.jpg';

import logo from '../../assets/logoWellcome.png';

const slides = [backgroundImage3, backgroundImage2, backgroundImage1];
const phrases = [
  'Otimize a produtividade pelo manejo adequado da pastagem.',
  'A solidez da Ciência na tomada de decisão.',
  'Seja eficiente, rápido e preciso. Seja GRAZING!',
];

import {
  Container,
  Background,
  BottomBox,
  BottomBoxText,
  Logo,
  Pagination,
  ActiveDot,
  InactiveDot,
} from './styles';

const Wellcome = ({navigation}) => {
  const [index, setIndex] = React.useState(0);

  const timeout = setTimeout(() => {
    if((index +1) < slides.length) {
      setIndex(index + 1)
    }else setIndex(0)
  }, 5000);

  const handleBackground = event => {
    let {translationX} = event.nativeEvent;

    if (translationX > 30) {
      if (index > 0) {
        setIndex(index - 1);
      }
    }

    if (translationX < -30) {
      if (slides.length - 1 > index) {
        setIndex(index + 1);
      }
    }
  };

  return (
    <Background source={slides[index]}>
      <PanGestureHandler
        onHandlerStateChange={event => handleBackground(event)}>
        <Container>
          <Logo source={logo} />
          <BottomBox>
            {phrases.map(
              (text, indexElement) =>
                index === indexElement && <BottomBoxText>{text}</BottomBoxText>,
            )}
            <Pagination>
              {slides.map((dot, indexElement) =>
                index === indexElement ? <ActiveDot /> : <InactiveDot />,
              )}
            </Pagination>
            <Link
              content="Já tenho conta"
              color="#774D37"
              mb={15}
              onPress={() => navigation.navigate('Login')}
            />
            <Button
              content="Criar conta"
              color="#774D37"
              onPress={() => navigation.navigate('Register')}
            />
          </BottomBox>
        </Container>
      </PanGestureHandler>
    </Background>
  );
};

export default Wellcome;
