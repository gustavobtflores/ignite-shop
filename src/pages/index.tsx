import { useKeenSlider } from "keen-slider/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Handbag } from "phosphor-react";
import Stripe from "stripe";

import { formatCurrency } from "../helpers/formatCurrency";
import { useCart } from "../hooks/useCart";
import { stripe } from "../lib/stripe";
import { HomeContainer, Product } from "../styles/pages/home";

import "keen-slider/keen-slider.min.css";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    priceFormatted: string;
    defaultPriceId: string;
  }[];
}

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  priceFormatted: string;
  defaultPriceId: string;
}

export default function Home({ products }: HomeProps) {
  const { cart, addToCart } = useCart();

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
    breakpoints: {
      "(max-width: 480px)": {
        slides: {
          perView: 1,
          spacing: 16,
        },
      },
    },
  });

  function handleAddToCart(
    event: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
  }

  return (
    <>
      <Head>
        <title>Home - Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image
                  src={product.imageUrl}
                  width={520}
                  height={480}
                  alt={product.name}
                  priority
                />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.priceFormatted}</span>
                  </div>
                  <button
                    onClick={(event) => {
                      handleAddToCart(event, product);
                    }}
                    disabled={cart.some((item) => item.id === product.id)}
                    aria-label="Adicionar ao carrinho"
                  >
                    <Handbag size={32} />
                  </button>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      priceFormatted: formatCurrency(price.unit_amount! / 100),
      defaultPriceId: price.id,
      description: product.description,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
    //revalidate - tempo em segundos para a página ser revalidada/reconstruída
  };
};
