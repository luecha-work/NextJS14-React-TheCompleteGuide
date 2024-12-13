import { Product } from "@/models/product";
import fs from "fs/promises";
import Link from "next/link";
import path from "path";
import React from "react";

interface HomePageProps {
  products: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  if (!Array.isArray(products)) {
    return <div>No products available</div>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "src", "data/dummy-backend.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const parsedData = JSON.parse(jsonData);

  if (!parsedData) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  if (parsedData.products.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: parsedData.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
