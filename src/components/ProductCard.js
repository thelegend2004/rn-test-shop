import { TouchableOpacity, Text } from "react-native";

export default function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ padding: 12, borderBottomWidth: 1 }}
    >
      <Text style={{ fontWeight: "600" }}>{item.name}</Text>
      <Text numberOfLines={2}>{item.description}</Text>
      <Text style={{marginTop: 6}}>{item.price} грн</Text>
    </TouchableOpacity>
  );
}
