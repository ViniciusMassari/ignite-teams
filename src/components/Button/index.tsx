import { PressableProps } from 'react-native';

import { ButtonTypeStyleProps, Container, Title } from './styles';

type Props = PressableProps & {
  title: string;
  type?: ButtonTypeStyleProps;
};

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
  return (
    <Container
      type={type}
      {...rest}
      // style={({ pressed }) => [
      //   {
      //     backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
      //   },
      // ]}
    >
      <Title>{title}</Title>
    </Container>
  );
}
