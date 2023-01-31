import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import {
  ImageContainer,
  ImagesWrapper,
  SuccessContainer,
} from "../styles/pages/success";

interface ProductProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[];
}

export default function Success({ customerName, products }: ProductProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada - Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ImagesWrapper>
          {products.map((product) => (
            <ImageContainer key={product.name}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={130}
                height={130}
              />
            </ImageContainer>
          ))}
        </ImagesWrapper>
        {products.length === 1 ? (
          <p>
            Uhuul <strong>{customerName}</strong>, sua {products[0].name} já
            está a caminho da sua casa.
          </p>
        ) : (
          <p>
            Uhuul <strong>{customerName}</strong>, seu pedido de{" "}
            {products.length} camisetas já está a caminho da sua casa.
          </p>
        )}

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;
  const products = session.line_items?.data || [];

  const productsList = products.map((product: Stripe.LineItem) => {
    if (product.price) {
      const { name, images } = product.price.product as Stripe.Product;
      return {
        name,
        imageUrl: images[0],
      };
    }

    return null;
  });

  return {
    props: {
      customerName,
      products: productsList,
    },
  };
};
