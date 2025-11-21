import { Link } from 'expo-router';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Super App Pet</Text>
      <View style={styles.cards}>
        <Link href="/products" style={styles.card}>Ração & produtos</Link>
        <Link href="/services" style={styles.card}>Banho & tosa</Link>
        <Link href="/walkers" style={styles.card}>Passeios & cuidadores</Link>
      </View>
      <Link href="/auth" style={styles.link}>Entrar / Registrar</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 16 },
  title: { fontSize: 28, fontWeight: '700' },
  cards: { gap: 12 },
  card: { padding: 16, backgroundColor: '#eef2ff', borderRadius: 10 },
  link: { marginTop: 16, color: '#4338ca', fontWeight: '600' }
});
