import { ThemedView, ThemedText } from "../components/Themed";
import { Button } from "react-native";
import useStore from "../store/useStore";

export default function SettingsScreen() {
  const theme = useStore((s) => s.theme);
  const setTheme = useStore((s) => s.setTheme);

  let themeString;
  switch (theme) {
    case "light":
      themeString = "Светлая";
      break;
    case "dark":
      themeString = "Темная";
      break;
    default:
      themeString = "Системная";
      break;
  }

  return (
    <ThemedView style={{ flex: 1, padding: 16, gap: 4 }}>
      <ThemedText>Текущая тема: {themeString}</ThemedText>
      <Button title="Светлая" onPress={() => setTheme("light")} />
      <Button title="Темная" onPress={() => setTheme("dark")} />
      <Button title="Системная" onPress={() => setTheme("system")} />
    </ThemedView>
  );
}
