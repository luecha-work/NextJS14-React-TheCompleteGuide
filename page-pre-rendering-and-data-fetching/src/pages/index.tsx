import { Product } from "@/models/product";
import fs from "fs/promises";
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
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "src", "data/dummy-backend.json");

  try {
    const jsonData = await fs.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(jsonData);

    return {
      props: {
        products: parsedData.products,
      },
    };
  } catch (error) {
    console.error("Error reading data file:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}

export default HomePage;
