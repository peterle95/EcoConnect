import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>EcoConnect Mobile</Text>
        <Text style={styles.subtitle}>Welcome to the React Native app!</Text>
        <Text style={styles.note}>This is the mobile version of EcoConnect.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3EB',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#386641',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#A68A64',
    marginBottom: 8,
  },
  note: {
    fontSize: 14,
    color: '#333',
    marginTop: 16,
  },
}); 