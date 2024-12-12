import React from "react";

interface Product {
  id: number;
  name: string;
}

interface HomePageProps {
  products: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      products: [
        {
          id: 1,
          name: "Product 1",
        },
        {
          id: 2,
          name: "Product 2",
        },
        {
          id: 3,
          name: "Product 3",
        },
      ],
    },
  };
}

export default HomePage;
