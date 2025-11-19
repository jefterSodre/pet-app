import { useEffect, useState } from 'react';
import axios from 'axios';

interface Appointment {
  id: number;
  status: string;
  startDateTime: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:3000/appointments', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setAppointments(res.data));
  }, []);

  return (
    <section>
      <h1>Agendamentos</h1>
      <ul>
        {appointments.map((a) => (
          <li key={a.id}>
            #{a.id} - {a.status} - {new Date(a.startDateTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </section>
  );
}
