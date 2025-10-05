import { Text, View, Button } from "react-native";
import useStore from "../store/useStore";

export default function ProductScreen({ route }) {
  const { item } = route.params;
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const addToCard = useStore((s) => s.addToCard);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>{item.price} грн</Text>
      <Button title="В избранное"/>
      <View style={{ height: 8 }} />
      <Button title="В корзину"/>
    </View>
  );
}
