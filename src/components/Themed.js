import { View, Text, TextInput } from "react-native";
import { useTheme } from "@react-navigation/native";

export function ThemedView({ style, ...props }) {
  const { colors } = useTheme();
  return (
    <View style={[{ backgroundColor: colors.background, borderColor: colors.border }, style]} {...props} />
  );
}

export function ThemedText({ style, ...props }) {
  const { colors } = useTheme();
  return (
    <Text style={[{ color: colors.text }, style]} {...props} />
  );
}

export function ThemedTextInput({style, ...props}) {
  const { colors } = useTheme();
  return (
    <TextInput style={[{ color: colors.text, borderColor: colors.border }, style]} placeholderTextColor={colors.text} {...props} />
  );
}