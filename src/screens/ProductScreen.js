import { ThemedView, ThemedText } from "../components/Themed";
import { Button } from "react-native";
import useStore from "../store/useStore";

export default function ProductScreen({ route }) {
  const { item } = route.params;
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const addToCart = useStore((s) => s.addToCart);

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText style={{ fontSize: 22, fontWeight: "700" }}>{item.name}</ThemedText>
      <ThemedText>{item.description}</ThemedText>
      <ThemedText>{item.price} грн</ThemedText>
      <Button title="В избранное" onPress={() => toggleFavorite(item)}/>
      <ThemedView style={{ height: 8 }} />
      <Button title="В корзину" onPress={() => {addToCart(item, 1)}}/>
    </ThemedView>
  );
}
