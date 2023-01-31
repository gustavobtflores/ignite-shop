import { createContext, ReactNode, useContext, useState } from "react";

interface CartContextData {
  cart: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: string) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

interface Product {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  imageUrl: string;
  defaultPriceId: string;
}

export const CartContext = createContext<CartContextData>(
  {} as CartContextData
);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Product[]>([]);

  function addToCart(item: Product) {
    setCart([...cart, item]);
  }

  function removeFromCart(id: string) {
    setCart(cart.filter((item) => item.id !== id));
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);

  return context;
}
