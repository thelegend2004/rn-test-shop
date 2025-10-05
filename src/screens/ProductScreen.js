import { ThemedView, ThemedText } from "../components/Themed";
import { Button } from "react-native";
import useStore from "../store/useStore";
import { useEffect, useState } from "react";

export default function ProductScreen({ route }) {
  const { item } = route.params;
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const isInFavorite = useStore((s) => s.isInFavorite);
  const addToCart = useStore((s) => s.addToCart);
  const favorites = useStore((s) => s.favorites);
  const [addToFavText, setAddToFavText] = useState("В избранное")

  useEffect(() => {
    if(isInFavorite(item)) {
      setAddToFavText("Удалить из избранного");
    } else {
      setAddToFavText("В избранное");
    }
  }, [favorites, isInFavorite, item])

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText style={{ fontSize: 22, fontWeight: "700" }}>{item.name}</ThemedText>
      <ThemedText>{item.description}</ThemedText>
      <ThemedText>{item.price} грн</ThemedText>
      <Button title={addToFavText} onPress={() => toggleFavorite(item)}/>
      <ThemedView style={{ height: 8 }} />
      <Button title="В корзину" onPress={() => {addToCart(item, 1)}}/>
    </ThemedView>
  );
}
