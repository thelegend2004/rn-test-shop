import { useState } from "react";
import useStore from "../store/useStore";
import { ThemedView, ThemedText, ThemedTextInput } from "../components/Themed";
import ProductCard from "../components/ProductCard";
import { Button, FlatList } from "react-native";

export default function FavoritesScreen({ navigation }) {
  const fav = useStore((s) => s.favorites);
  const removeFavorite = useStore((s) => s.removeFavorite);
  const [query, setQuery] = useState("");

  const list = fav.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  if (fav.length === 0)
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>Пусто</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView>
      <ThemedTextInput
        placeholder="Поиск в избранном"
        value={query}
        onChangeText={setQuery}
        style={{ padding: 8, borderBottomWidth: 1 }}
      />
      <FlatList
        data={list}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <ThemedView>
            <ProductCard
              item={item}
              onPress={() => navigation.navigate("Product", { item })}
            />
            <Button
              title="Удалить из избранного"
              onPress={() => removeFavorite(item.id)}
            />
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}
