import styled from 'styled-components/native';
import { CaretLeft } from 'phosphor-react-native';

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 46px;
  height: 55px;
`;

const BackButton = styled.Pressable`
  flex: 1;
`;

const BackIcon = styled(CaretLeft).attrs(({ theme }) => ({
  color: theme.COLORS.WHITE,
  size: 32,
}))``;

export { Container, Logo, BackIcon, BackButton };
