import { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  id: number;
  status: string;
  totalAmount: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:3000/orders', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setOrders(res.data));
  }, []);

  return (
    <section>
      <h1>Pedidos</h1>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            #{o.id} - {o.status} - R$ {o.totalAmount.toFixed(2)}
          </li>
        ))}
      </ul>
    </section>
  );
}
