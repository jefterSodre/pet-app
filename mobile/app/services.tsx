import { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

interface Service {
  id: number;
  name: string;
  type: string;
  basePrice: number;
}

export default function ServicesScreen() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/services').then((res) => setServices(res.data));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Serviços</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name} - {item.type} - R$ {item.basePrice.toFixed(2)}</Text>
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
