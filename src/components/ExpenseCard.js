// src/components/ExpenseCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CATEGORY_ICONS = {
  Food: '🍔', Travel: '✈️', Shopping: '🛍️', Bills: '📄', Other: '📦',
};

const CATEGORY_COLORS = {
  Food: '#FFF3E0', Travel: '#E3F2FD', Shopping: '#F3E5F5', Bills: '#E8F5E9', Other: '#F5F5F5',
};

export default function ExpenseCard({ expense, onDelete }) {
  const icon = CATEGORY_ICONS[expense.category] || '📦';
  const bgColor = CATEGORY_COLORS[expense.category] || '#F5F5F5';

  return (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{expense.title}</Text>
        <Text style={styles.meta}>{expense.category} · {expense.date}</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.amount}>-₹{expense.amount.toFixed(2)}</Text>
        {onDelete && (
          <TouchableOpacity onPress={() => onDelete(expense.id)} style={styles.deleteBtn}>
            <Text style={styles.deleteText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: { fontSize: 20 },
  info: { flex: 1 },
  title: { fontSize: 15, fontWeight: '600', color: '#1a1a1a', marginBottom: 3 },
  meta: { fontSize: 12, color: '#999' },
  right: { alignItems: 'flex-end' },
  amount: { fontSize: 15, fontWeight: '700', color: '#E53935' },
  deleteBtn: { marginTop: 6, padding: 2 },
  deleteText: { fontSize: 12, color: '#ccc' },
});
