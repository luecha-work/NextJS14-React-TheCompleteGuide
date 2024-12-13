import { useState } from "react";

interface Sale {
  id: string;
  username: string;
  volume: number;
}

interface LastSalesPageProps {
  sales: Sale[];
}

function LastSalesPage(props: LastSalesPageProps) {
  const [sales, setSales] = useState<Sale[]>(props.sales);

  //TODO: Replace the useEffect with useSWR
  //   const { data, error } = useSWR(
  //     "https://nextjs-course-f1fec-default-rtdb.firebaseio.com/sales.json",
  //     (url) => fetch(url).then((res) => res.json())
  //   );

  //   useEffect(() => {
  //     if (data) {
  //       const transformedSales: Sale[] = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transformedSales);
  //     }
  //   }, [data]);

  //   if (error) {
  //     return <p>Failed to load.</p>;
  //   }

  //TODO: Replace the useEffect with Next hook
  //   useEffect(() => {
  //     fetch("https://nextjs-course-f1fec-default-rtdb.firebaseio.com/sales.json")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const transformedSales: Sale[] = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //       });
  //   }, []);

  if (!sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-f1fec-default-rtdb.firebaseio.com/sales.json"
  );

  const data = await response.json();

  const transformedSales: Sale[] = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformedSales,
    },
    revalidate: 10,
  };
}

export default LastSalesPage;
