import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleLogin() {
    try {
      const res = await axios.post('http://localhost:3000/auth/login', { email, password });
      setMessage(`Bem-vindo ${res.data.user.name}`);
      localStorage.setItem('token', res.data.tokens.accessToken);
    } catch (error) {
      setMessage('Falha no login');
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
      <p>{message}</p>
    </div>
  );
}
