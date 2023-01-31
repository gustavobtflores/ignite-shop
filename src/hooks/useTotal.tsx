import { useMemo } from "react";
import { useCart } from "./useCart";

export function useTotal() {
  const { cart } = useCart();

  const total = useMemo(() => {
    return cart.reduce((acc, product) => {
      return acc + product.price / 100;
      //product.price vem como centavos, por isso a necessidade de dividir por 100
    }, 0);
  }, [cart]);

  return total;
}
