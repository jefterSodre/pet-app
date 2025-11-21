import { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/products').then((res) => setProducts(res.data));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Produtos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name} - R$ {item.price.toFixed(2)}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  item: { paddingVertical: 8 }
});
