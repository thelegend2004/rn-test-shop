const { createBottomTabNavigator } = require("@react-navigation/bottom-tabs");
const { createNativeStackNavigator } = require("@react-navigation/native-stack");

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function TabsNavigator() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Catalog" component={<></>} />
      <Tabs.Screen name="Favorites" component={<></>} />
      <Tabs.Screen name="Cart" component={<></>} />
      <Tabs.Screen name="Settings" component={<></>} />
    </Tabs.Navigator>
  )
}