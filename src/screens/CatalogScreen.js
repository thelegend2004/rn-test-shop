import { useState } from "react";
import { View, FlatList, TextInput } from "react-native";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

export default function CatalogScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const list = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Поиск"
        value={query}
        onChangeText={setQuery}
        style={{ padding: 8, borderBottomWidth: 1 }}
      />
      <FlatList
        data={list}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => {
              navigation.navigate("Product", { item });
            }}
          />
        )}
      />
    </View>
  );
}
