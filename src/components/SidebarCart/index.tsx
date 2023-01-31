import { useCart } from "@/src/hooks/useCart";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import {
  CartItems,
  CartSummary,
  CartWrapper,
  Close,
  Content,
  ImageCard,
  ItemInfo,
  SummaryDetails,
  Total,
} from "./styles";
import Image from "next/image";
import { useTotal } from "@/src/hooks/useTotal";
import { formatCurrency } from "@/src/helpers/formatCurrency";
import axios from "axios";

export function SidebarCart() {
  const { cart, removeFromCart } = useCart();
  const total = useTotal();

  function handleRemoveFromCart(id: string) {
    removeFromCart(id);
  }

  async function handleFinishPurchase() {
    const purchaseItemsList = cart.map((item) => {
      return {
        price: item.defaultPriceId,
        quantity: 1,
      };
    });

    try {
      const response = await axios.post("/api/checkout", {
        cartItems: purchaseItemsList,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      alert("Falha ao redirecionar ao checkout");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay />
      <Content>
        <Close>
          <X size={24} />
        </Close>
        <Dialog.Title>Sacola de compras</Dialog.Title>
        <CartWrapper>
          <CartItems>
            {cart.length > 0 ? (
              cart.map((item) => (
                <li key={item.id}>
                  <ImageCard>
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={100}
                      height={100}
                    />
                  </ImageCard>
                  <ItemInfo>
                    <div>
                      <span>{item.name}</span>
                      <strong>{item.priceFormatted}</strong>
                    </div>
                    <button
                      onClick={() => {
                        handleRemoveFromCart(item.id);
                      }}
                    >
                      Remover
                    </button>
                  </ItemInfo>
                </li>
              ))
            ) : (
              <span>
                Parece que você ainda não adicionou items ao seu carrinho
              </span>
            )}
          </CartItems>

          {cart.length > 0 ? (
            <CartSummary>
              <SummaryDetails>
                <span>Quantidade</span>
                <span>{cart.length} items</span>
              </SummaryDetails>
              <Total>
                <span>Valor total</span>
                <strong>{formatCurrency(total)}</strong>
              </Total>
              <button onClick={handleFinishPurchase}>Finalizar compra</button>
            </CartSummary>
          ) : null}
        </CartWrapper>
      </Content>
    </Dialog.Portal>
  );
}
