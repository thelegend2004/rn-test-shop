import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  favorites: "SHOP_FAVORITES",
  cart: "SHOP_CART",
  theme: "SHOP_THEME",
};

const useStore = create((set, get) => ({
  favorites: [],
  cart: [],
  theme: "system",

  toggleFavorites: (product) => {
    const fav = get().favorites.find((p) => p.id === product.id);
    const next = fav
      ? get().favorites.filter((p) => p.id !== product.id)
      : [...get().favorites, product];
    set({ favorites: next });
    AsyncStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(next));
  },

  removeFavorite: (id) => {
    const next = get().favorites.filter((p) => p.id !== id);
    set({ favorites: next });
    AsyncStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(next));
  },

  addToCart: (product, qty = 1) => {
    const found = get().cart.find((i) => i.product.id === product.id);
    let next;
    if (found) {
      next = get().cart.map((i) =>
        i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
      );
    } else {
      next = [...get().cart, { id: product.id, product, qty }];
    }
    set({ cart: next });
    AsyncStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(next));
  },
  updateQty: (productId, qty) => {
    let next = get()
      .cart.map((i) => (i.product.id === productId ? { ...i, qty } : i))
      .filter((i) => i.qty > 0);
    set({ cart: next });
    AsyncStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(next));
  },

  clearCart: () => {
    set({ cart: [] });
    AsyncStorage.removeItem(STORAGE_KEYS.cart);
  },

  setTheme: async (value) => {
    set({ theme: value });
    await AsyncStorage.setItem(STORAGE_KEYS.theme, value);
  },

  loadStorage: async() => {
    try {
      const [fav, cart, theme] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.favorites),
        AsyncStorage.getItem(STORAGE_KEYS.cart),
        AsyncStorage.getItem(STORAGE_KEYS.theme),
      ]);
      if(fav) set({favorites: JSON.parse(fav)});
      if(cart) set({cart: JSON.parse(cart)});
      if(theme) set({theme});
    } catch (err) {
      console.warn("Faile to load store", err);
    }
  }
}));

export default useStore;