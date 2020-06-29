import React from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Link from '../../components/Link';
import Button from '../../components/Button';

import backgroundImage1 from '../../assets/loading1.jpg';
import backgroundImage2 from '../../assets/loading2.jpg';
import backgroundImage3 from '../../assets/loading3.jpg';

import logo from '../../assets/logoWellcome.png';

const slides = [backgroundImage1, backgroundImage2, backgroundImage3];

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
            <BottomBoxText>
              Maneje o seu pasto da forma adequada para otimizar a produtividade
            </BottomBoxText>
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
              disabled={index !== slides.length - 1}
            />
          </BottomBox>
        </Container>
      </PanGestureHandler>
    </Background>
  );
};

export default Wellcome;
