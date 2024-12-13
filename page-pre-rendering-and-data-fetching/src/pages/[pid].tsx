import fs from "fs/promises";
import { GetStaticProps } from "next";
import path from "path";
import { Fragment } from "react";

interface ProductDetailPageProps {
  loadedProduct: {
    id: string;
    title: string;
    description: string;
  };
}

function ProductDetailPage({ loadedProduct }: ProductDetailPageProps) {
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const productId = params?.pid;

  const filePath = path.join(process.cwd(), "src", "data/dummy-backend.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const parsedData = JSON.parse(jsonData);

  const product = parsedData.products.find(
    (product: { id: string }) => product.id === productId
  );

  return {
    props: {
      loadedProduct: product,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
    fallback: false,
  };
}

export default ProductDetailPage;
