import { ThemedText } from "./Themed";
import { TouchableOpacity } from "react-native";

export default function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ padding: 12, borderBottomWidth: 1 }}
    >
      <ThemedText style={{ fontWeight: "600" }}>{item.name}</ThemedText>
      <ThemedText numberOfLines={2}>{item.description}</ThemedText>
      <ThemedText style={{marginTop: 6}}>{item.price} грн</ThemedText>
    </TouchableOpacity>
  );
}
