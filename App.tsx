import { StatusBar } from 'react-native';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { ThemeProvider } from 'styled-components';

import { NewGroup } from './src/screens/NewGroup';
import { Loading } from '@components/Loading';
import theme from './src/theme';
import { Players } from '@screens/Players';
import { Groups } from '@screens/Groups';
import { AppRoutes } from '@routes/app.routes';
import { Routes } from '@routes/index';

export default function App() {
  const [fontsloaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor={'transparent'}
      />
      {fontsloaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  );
}
