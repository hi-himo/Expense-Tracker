import React, { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ExpenseCard from '../components/ExpenseCard';
import { loadExpenses, deleteExpense } from '../storage/expenseStorage';

export default function DashboardScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => { fetchExpenses(); }, [])
  );

  async function fetchExpenses() {
    const data = await loadExpenses();
    setExpenses(data);
  }

  async function handleDelete(id) {
    const updated = await deleteExpense(id);
    setExpenses(updated);
  }

  async function onRefresh() {
    setRefreshing(true);
    await fetchExpenses();
    setRefreshing(false);
  }

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const recentExpenses = expenses.slice(0, 4);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good day 👋</Text>
            <Text style={styles.subGreeting}>Here's your spending summary</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddExpense')}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {/* Total Spent Card */}
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total Spent</Text>
          <Text style={styles.totalAmount}>₹{totalExpenses.toFixed(2)}</Text>
          <Text style={styles.totalSub}>{expenses.length} expense{expenses.length !== 1 ? 's' : ''} recorded</Text>
        </View>

        {/* Recent Expenses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Expenses</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ExpenseList')}>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>

          {recentExpenses.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🎉</Text>
              <Text style={styles.emptyText}>No expenses yet!</Text>
              <Text style={styles.emptySubText}>Tap "+ Add" to record your first one.</Text>
            </View>
          ) : (
            recentExpenses.map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} onDelete={handleDelete} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F8FA' },
  container: { flex: 1, paddingHorizontal: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: { fontSize: 22, fontWeight: '700', color: '#1a1a1a' },
  subGreeting: { fontSize: 13, color: '#999', marginTop: 2 },
  addButton: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  totalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  totalLabel: { fontSize: 13, color: '#999', fontWeight: '500', marginBottom: 6 },
  totalAmount: { fontSize: 40, fontWeight: '800', color: '#E53935', marginBottom: 4 },
  totalSub: { fontSize: 12, color: '#bbb' },
  section: { marginBottom: 30 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1a1a1a' },
  seeAll: { fontSize: 13, color: '#888', fontWeight: '500' },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
    borderRadius: 14,
  },
  emptyIcon: { fontSize: 36, marginBottom: 10 },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#333' },
  emptySubText: { fontSize: 13, color: '#aaa', marginTop: 4 },
});
