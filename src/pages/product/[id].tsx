import { formatCurrency } from "@/src/helpers/formatCurrency";
import { useCart } from "@/src/hooks/useCart";
import { stripe } from "@/src/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    priceFormatted: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { cart, addToCart } = useCart();

  async function handleAddProductToCart(id: string) {
    addToCart(product);
  }

  return (
    <>
      <Head>
        <title>{product.name} - Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.priceFormatted}</span>
          <p>{product.description}</p>

          <button
            disabled={cart.some((item) => item.id === product.id)}
            onClick={() => {
              handleAddProductToCart(product.id);
            }}
            aria-label="Adicionar ao carrinho"
          >
            Adicionar a sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async ({}) => {
  return {
    paths: [
      {
        params: { id: "prod_NEKgoBSPx1F9tb" },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;

  try {
    const product = await stripe.products.retrieve(productId, {
      expand: ["default_price"],
    });

    const price = product.default_price as Stripe.Price;

    return {
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          price: price.unit_amount,
          priceFormatted: formatCurrency(price.unit_amount! / 100),
          description: product.description,
          defaultPriceId: price.id,
        },
      },
      revalidate: 60 * 60 * 1, // 1 hour
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
