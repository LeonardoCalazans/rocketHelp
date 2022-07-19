import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Details, Register } from "../screens";

const { Navigator, Screen } = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="new" component={Register} />
      <Screen name="details" component={Details} />
    </Navigator>
  );
};

export default AppRoutes;
