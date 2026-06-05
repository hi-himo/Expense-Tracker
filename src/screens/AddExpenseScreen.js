import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addExpense } from '../storage/expenseStorage';

const CATEGORIES = ['Food', 'Travel', 'Shopping', 'Bills', 'Other'];

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function generateId() {
  return Date.now().toString();
}

export default function AddExpenseScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(getTodayDate());
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a title for the expense.');
      return;
    }
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid positive amount.');
      return;
    }

    setSaving(true);
    const newExpense = {
      id: generateId(),
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date,
    };
    await addExpense(newExpense);
    setSaving(false);

    Alert.alert('Saved! ✅', 'Your expense has been recorded.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">

          <Text style={styles.pageTitle}>Add Expense</Text>
          <Text style={styles.pageSubtitle}>Track where your money goes</Text>

          {/* Amount */}
          <View style={styles.field}>
            <Text style={styles.label}>Amount (₹)</Text>
            <View style={styles.amountRow}>
              <Text style={styles.rupeeSign}>₹</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor="#ccc"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
          </View>

          {/* Title */}
          <View style={styles.field}>
            <Text style={styles.label}>Title / Note</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Lunch, Metro card, Shoes..."
              placeholderTextColor="#ccc"
              value={title}
              onChangeText={setTitle}
              maxLength={60}
            />
          </View>

          {/* Date */}
          <View style={styles.field}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#ccc"
              value={date}
              onChangeText={setDate}
            />
            <Text style={styles.hint}>💡 Format: YYYY-MM-DD (e.g. 2024-06-10)</Text>
          </View>

          {/* Category */}
          <View style={styles.field}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryGrid}>
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.categoryBtn, isSelected && styles.categoryBtnActive]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Save */}
          <TouchableOpacity
            style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            <Text style={styles.saveBtnText}>{saving ? 'Saving...' : 'Save Expense'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F8FA' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 24 },
  pageTitle: { fontSize: 26, fontWeight: '800', color: '#1a1a1a', marginBottom: 4 },
  pageSubtitle: { fontSize: 14, color: '#aaa', marginBottom: 28 },
  field: { marginBottom: 22 },
  label: {
    fontSize: 13, fontWeight: '600', color: '#555',
    marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#fff', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 15, color: '#1a1a1a',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  },
  amountRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  },
  rupeeSign: { fontSize: 22, color: '#aaa', marginRight: 6 },
  amountInput: { flex: 1, fontSize: 28, fontWeight: '700', color: '#1a1a1a', paddingVertical: 14 },
  hint: { fontSize: 12, color: '#aaa', marginTop: 6 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryBtn: {
    paddingHorizontal: 18, paddingVertical: 10,
    borderRadius: 20, backgroundColor: '#F0F0F0',
  },
  categoryBtnActive: { backgroundColor: '#1a1a1a' },
  categoryText: { fontSize: 14, color: '#555', fontWeight: '500' },
  categoryTextActive: { color: '#fff' },
  saveBtn: {
    backgroundColor: '#1a1a1a', borderRadius: 14,
    paddingVertical: 16, alignItems: 'center', marginTop: 10, marginBottom: 12,
  },
  saveBtnDisabled: { backgroundColor: '#888' },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cancelBtn: { alignItems: 'center', paddingVertical: 12, marginBottom: 40 },
  cancelText: { color: '#aaa', fontSize: 14 },
});
