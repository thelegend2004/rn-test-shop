import { View, FlatList, Text, Button } from "react-native";
import useStore from "../store/useStore";

export default function CartScreen() {
  const cart = useStore((s) => s.cart);
  const updateQty = useStore((s) => s.updateQty);
  const clearCart = useStore((s) => s.clearCart);
  const total = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cart}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text>{item.product.name}</Text>
            <Text>
              {item.product.price} грн | {item.qty} штк.
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Button
                title="-"
                onPress={() => updateQty(item.product.id, item.qty - 1)}
              />
              <Button
                title="+"
                onPress={() => updateQty(item.product.id, item.qty + 1)}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ padding: 16 }}>Пустая корзина</Text>}
      />

      <View style={{padding: 12}}>
        <Text>Итого: {total} грн</Text>
        <Button title="Очистить корзину" onPress={clearCart}/>
      </View>
    </View>
  );
}
