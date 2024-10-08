import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`;

const Title = styled.Text`
  color: #fff;
  font-size: 24px;
`;

export { Container, Title };
