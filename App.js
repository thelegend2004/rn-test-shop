import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useEffect } from "react";
import useStore from "./src/store/useStore"
import { SafeAreaProvider } from "react-native-safe-area-context";
import CatalogScreen from "./src/screens/CatalogScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductScreen from "./src/screens/ProductScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import CartScreen from "./src/screens/CartScreen";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function TabsNavigator() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Каталог" component={CatalogScreen} />
      <Tabs.Screen name="Избранное" component={FavoritesScreen} />
      <Tabs.Screen name="Корзина" component={CartScreen} />
    </Tabs.Navigator>
  );
}

export default function App() {
  const theme = useStore((s) => s.theme);

  const navTheme = theme === "dark" ? DarkTheme : DefaultTheme;

  useEffect(() => {
    useStore.getState().loadStorage();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={TabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Product"
            component={ProductScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
