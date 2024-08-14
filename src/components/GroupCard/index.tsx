import { View, Text, PressableProps } from 'react-native';

import { Container, Icon, Title } from './style';

type GroupCardProps = {
  title: string;
} & PressableProps;

export const GroupCard = ({ title, ...rest }: GroupCardProps) => {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
};
