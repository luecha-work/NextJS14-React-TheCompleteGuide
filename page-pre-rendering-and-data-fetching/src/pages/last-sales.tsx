import { useEffect, useState } from "react";

interface Sale {
  id: string;
  username: string;
  volume: number;
}

function LastSalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://nextjs-course-f1fec-default-rtdb.firebaseio.com/sales.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(`data: ${JSON.stringify(data)}`);

        const transformedSales: Sale[] = [];

        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (sales.length === 0) {
    return <p>No sales found</p>;
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

export default LastSalesPage;
