import { Container, SubTitle, Title } from './style';

type HighlightProps = {
  title: string;
  subtitle: string;
};

export const Highlight = ({ title, subtitle }: HighlightProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </Container>
  );
};
