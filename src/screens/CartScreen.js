import { ThemedView, ThemedText } from "../components/Themed";
import { FlatList, Button } from "react-native";
import useStore from "../store/useStore";

export default function CartScreen() {
  const cart = useStore((s) => s.cart);
  const updateQty = useStore((s) => s.updateQty);
  const clearCart = useStore((s) => s.clearCart);
  const total = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  return (
    <ThemedView style={{ flex: 1 }}>
      <FlatList
        data={cart}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <ThemedView style={{ padding: 12, borderBottomWidth: 1 }}>
            <ThemedText>{item.product.name}</ThemedText>
            <ThemedText>
              {item.product.price} грн | {item.qty} штк.
            </ThemedText>
            <ThemedView style={{ flexDirection: "row", gap: 8 }}>
              <Button
                title="-"
                onPress={() => updateQty(item.product.id, item.qty - 1)}
              />
              <Button
                title="+"
                onPress={() => updateQty(item.product.id, item.qty + 1)}
              />
            </ThemedView>
          </ThemedView>
        )}
        ListEmptyComponent={
          <ThemedText style={{ padding: 16 }}>Пустая корзина</ThemedText>
        }
      />

      <ThemedView style={{ padding: 12 }}>
        <ThemedText>Итого: {total} грн</ThemedText>
        <Button title="Очистить корзину" onPress={clearCart} />
      </ThemedView>
    </ThemedView>
  );
}
