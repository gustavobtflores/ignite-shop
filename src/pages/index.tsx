import { useKeenSlider } from "keen-slider/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

import { formatCurrency } from "../helpers/formatCurrency";
import { stripe } from "../lib/stripe";
import { HomeContainer, Product } from "../styles/pages/home";

import "keen-slider/keen-slider.min.css";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
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
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
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
      price: formatCurrency(price.unit_amount! / 100),
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
