import { useState } from "react";
import useStore from "../store/useStore";
import ProductCard from "../components/ProductCard";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function FavoritesScreen({ navigation }) {
  const fav = useStore((s) => s.favorites);
  const removeFavorite = useStore((s) => s.removeFavorite);
  const [query, setQuery] = useState("");

  const list = fav.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  if (fav.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Пусто</Text>
      </View>
    );

  return (
    <View>
      <TextInput
        placeholder="Поиск в избранном"
        value={query}
        onChangeText={setQuery}
        style={{ padding: 8, borderBottomWidth: 1 }}
      />
      <FlatList
        data={list}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View>
            <ProductCard
              item={item}
              onPress={() => navigation.navigate("Product", { item })}
            />
            <Button
              title="Удалить из избранного"
              onPress={() => removeFavorite(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}
