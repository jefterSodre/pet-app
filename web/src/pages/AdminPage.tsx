import { useEffect, useState } from 'react';
import axios from 'axios';

interface Partner {
  id: number;
  fantasyName: string;
  type: string;
}

export default function AdminPage() {
  const [pending, setPending] = useState<Partner[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:3000/admin/partners/pending', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setPending(res.data));
  }, []);

  async function updateStatus(id: number, status: string) {
    const token = localStorage.getItem('token');
    await axios.put(
      `http://localhost:3000/admin/partners/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setPending((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <section>
      <h1>Admin - Parceiros pendentes</h1>
      <ul>
        {pending.map((p) => (
          <li key={p.id}>
            {p.fantasyName} ({p.type})
            <button onClick={() => updateStatus(p.id, 'approved')}>Aprovar</button>
            <button onClick={() => updateStatus(p.id, 'rejected')}>Reprovar</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
