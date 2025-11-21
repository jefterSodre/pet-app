import { useEffect, useState } from 'react';
import axios from 'axios';

interface Service {
  id: number;
  name: string;
  type: string;
  basePrice: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/services').then((res) => setServices(res.data));
  }, []);

  return (
    <section>
      <h1>Serviços</h1>
      <ul>
        {services.map((s) => (
          <li key={s.id}>
            {s.name} - {s.type} - R$ {s.basePrice.toFixed(2)}
          </li>
        ))}
      </ul>
    </section>
  );
}
