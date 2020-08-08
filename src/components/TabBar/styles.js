import styled from 'styled-components/native';

export const Container = styled.View`
  position: relative;
  height: 80px;
  padding: 18px 15px 10px 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #281100;
`;

export const Page = styled.TouchableOpacity`
  width: 20%;
  justify-content: center;
  align-items: center;
`;

export const Home = styled.TouchableOpacity`
  position: relative;
  top: -22px;
  width: 80px;
  height: 80px;
  border: 5px solid #fff;
  border-radius: 1000px;
  justify-content: center;
  align-items: center;
  background: #c94324;
`;

export const Icon = styled.Image`
  width: 30px;
  height: 30px;
  opacity: ${props => (props.focused ? 1 : 0.5)};
`;
