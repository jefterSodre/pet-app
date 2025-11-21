import { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function login() {
    try {
      const res = await axios.post('http://localhost:3000/auth/login', { email, password });
      setMessage(`Bem-vindo ${res.data.user.name}`);
    } catch (error) {
      setMessage('Erro ao autenticar');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Senha" value={password} secureTextEntry onChangeText={setPassword} style={styles.input} />
      <Button title="Login" onPress={login} />
      <Text>{message}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: '700' },
  input: { borderWidth: 1, borderColor: '#cbd5e1', padding: 12, borderRadius: 8 }
});
