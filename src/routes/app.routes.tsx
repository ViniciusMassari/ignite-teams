import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { NewGroup } from '@screens/NewGroup';
import { Groups } from '@screens/Groups';
import { Players } from '@screens/Players';

export type Routes = {
  Groups: undefined;
  NewGroup: undefined;
  Players: {
    group: string;
  };
};

const { Navigator, Screen } = createNativeStackNavigator<Routes>();

export const AppRoutes = () => {
  return (
    <Navigator initialRouteName='Groups' screenOptions={{ headerShown: false }}>
      <Screen name='NewGroup' component={NewGroup}></Screen>
      <Screen name='Groups' component={Groups}></Screen>
      <Screen name='Players' component={Players}></Screen>
    </Navigator>
  );
};
