import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { Handbag } from "phosphor-react";

import logoImg from "../../assets/logo.svg";
import { useCart } from "../../hooks/useCart";
import { SidebarCart } from "../SidebarCart";
import { CartButton, HeaderContainer } from "./styles";

export function Header() {
  const { cart } = useCart();

  return (
    <HeaderContainer>
      <Link href="/" title="Home">
        <Image src={logoImg} alt="" priority />
      </Link>
      <Dialog.Root>
        <Dialog.Trigger asChild aria-label="Abrir menu do carrinho">
          <CartButton empty={cart.length === 0}>
            <Handbag size={24} />
            <span className="amount">{cart.length}</span>
          </CartButton>
        </Dialog.Trigger>

        <SidebarCart />
      </Dialog.Root>
    </HeaderContainer>
  );
}
