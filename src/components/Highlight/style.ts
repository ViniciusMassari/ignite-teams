import styled from 'styled-components/native';
import { css } from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  margin: 32px 0;
`;
const Title = styled.Text`
  ${({ theme }) => css`
    text-align: center;
    font-size: ${theme.FONT_SIZE.XL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `}
`;

const SubTitle = styled.Text`
  ${({ theme }) => css`
    text-align: center;

    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_300};
  `}
`;

export { Container, SubTitle, Title };
