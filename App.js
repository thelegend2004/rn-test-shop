import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useEffect } from "react";
import useStore from "./src/store/useStore";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CatalogScreen from "./src/screens/CatalogScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductScreen from "./src/screens/ProductScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import CartScreen from "./src/screens/CartScreen";
import BrowserScreen from "./src/screens/BrowserScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function TabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Каталог") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Избранное") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Корзина") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Настройки") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3573f0ff",
        tabBarInactiveBackgroundColor: "#79787f42",
      })}
    >
      <Tabs.Screen name="Каталог" component={CatalogScreen} />
      <Tabs.Screen name="Избранное" component={FavoritesScreen} />
      <Tabs.Screen name="Корзина" component={CartScreen} />
      <Tabs.Screen name="Настройки" component={SettingsScreen} />
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
            name="Домашняя страница"
            component={TabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Товар" component={ProductScreen} />
          <Stack.Screen
            name="Браузер"
            component={BrowserScreen}
            options={{ presentation: "modal" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
