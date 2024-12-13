import fs from "fs/promises";
import { GetStaticPropsContext, NextPage } from "next";
import path from "path";
import { Fragment } from "react";

interface ProductDetailPageProps {
  loadedProduct: {
    id: string;
    title: string;
    description: string;
  };
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({
  loadedProduct,
}) => {
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};

async function getData() {
  const filePath = path.join(process.cwd(), "src", "data/dummy-backend.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const parsedData = JSON.parse(jsonData);

  return parsedData;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;

  const productId = params?.pid;

  const parsedData = await getData();

  const product = parsedData.products.find(
    (product: { id: string }) => product.id === productId
  );

  //TODO: fallback key
  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const parsedData = await getData();

  const ids = parsedData.products.map((product: { id: string }) => product.id);
  const pathWithParams = ids.map((id: string) => ({ params: { pid: id } }));

  //TODO: fallback key
  return {
    paths: pathWithParams,
    fallback: true,
  };
}

export default ProductDetailPage;
