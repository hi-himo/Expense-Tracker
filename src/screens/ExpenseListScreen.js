// src/screens/ExpenseListScreen.js
import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ExpenseCard from '../components/ExpenseCard';
import CategoryFilter from '../components/CategoryFilter';
import { loadExpenses, deleteExpense } from '../storage/expenseStorage';

export default function ExpenseListScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useFocusEffect(
    useCallback(() => { fetchExpenses(); }, [])
  );

  async function fetchExpenses() {
    const data = await loadExpenses();
    setExpenses(data);
  }

  async function handleDelete(id) {
    Alert.alert('Delete Expense', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          const updated = await deleteExpense(id);
          setExpenses(updated);
        },
      },
    ]);
  }

  const filteredExpenses =
    selectedCategory === 'All'
      ? expenses
      : expenses.filter((e) => e.category === selectedCategory);

  const filteredTotal = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    // Using flex:1 on SafeAreaView so FlatList can scroll properly
    <SafeAreaView style={styles.safe}>

      {/* Header — fixed at top, never scrolls */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>All Expenses</Text>
          <Text style={styles.pageSubtitle}>
            {filteredExpenses.length} item{filteredExpenses.length !== 1 ? 's' : ''} · ₹{filteredTotal.toFixed(2)} total
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddExpense')}
        >
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Category filter — fixed height row, never stretches */}
      <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

      {/* Expense list */}
      {filteredExpenses.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🗂️</Text>
          <Text style={styles.emptyText}>No expenses found</Text>
          <Text style={styles.emptySubText}>
            {selectedCategory === 'All'
              ? 'Add your first expense!'
              : `No expenses in "${selectedCategory}".`}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredExpenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExpenseCard expense={item} onDelete={handleDelete} />
          )}
          contentContainerStyle={styles.list}
          onRefresh={fetchExpenses}
          refreshing={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F8FA' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  pageTitle: { fontSize: 22, fontWeight: '800', color: '#1a1a1a' },
  pageSubtitle: { fontSize: 13, color: '#aaa', marginTop: 2 },
  addBtn: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16, paddingVertical: 9, borderRadius: 18,
  },
  addBtnText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  list: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 30 },
  emptyState: {
    flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80,
  },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 17, fontWeight: '600', color: '#444', marginBottom: 6 },
  emptySubText: { fontSize: 13, color: '#aaa', textAlign: 'center', paddingHorizontal: 40 },
});
