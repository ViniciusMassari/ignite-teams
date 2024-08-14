import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import { css } from 'styled-components/native';

const Container = styled(TextInput)`
  ${({ theme }) => css`
    flex: 1;
    min-height: 56px;
    max-height: 56px;
    color: ${theme.COLORS.WHITE};
    background-color: ${theme.COLORS.GRAY_700};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
    border-radius: 6px;
    padding: 16px;
  `}
`;

export { Container };
