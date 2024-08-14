import { useNavigation } from '@react-navigation/native';
import { BackIcon, Container, Logo, BackButton } from './style';

import logoImage from '@assets/logo.png';

type HeaderProps = {
  showBackButton?: boolean;
};

export const Header = ({ showBackButton = false }: HeaderProps) => {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate('Groups');
  }
  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImage} />
    </Container>
  );
};
