import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPENSES_KEY = 'expenses';

const SAMPLE_EXPENSES = [
  { id: '1', title: 'Grocery Shopping', amount: 45.5,  category: 'Food',     date: '2024-06-01' },
  { id: '2', title: 'Electricity Bill',  amount: 120.0, category: 'Bills',    date: '2024-06-02' },
  { id: '3', title: 'Uber to Airport',   amount: 32.0,  category: 'Travel',   date: '2024-06-03' },
  { id: '4', title: 'T-Shirt from Zara', amount: 29.99, category: 'Shopping', date: '2024-06-04' },
  { id: '5', title: 'Coffee & Snacks',   amount: 12.75, category: 'Food',     date: '2024-06-05' },
  { id: '6', title: 'Netflix',           amount: 15.99, category: 'Bills',    date: '2024-06-06' },
  { id: '7', title: 'Weekend Trip',      amount: 200.0, category: 'Travel',   date: '2024-06-07' },
  { id: '8', title: 'Miscellaneous',     amount: 18.0,  category: 'Other',    date: '2024-06-08' },
];

export async function loadExpenses() {
  try {
    const json = await AsyncStorage.getItem(EXPENSES_KEY);
    if (json !== null) return JSON.parse(json);
    await saveExpenses(SAMPLE_EXPENSES);
    return SAMPLE_EXPENSES;
  } catch (e) {
    console.error('loadExpenses error:', e);
    return [];
  }
}

export async function saveExpenses(expenses) {
  try {
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch (e) {
    console.error('saveExpenses error:', e);
  }
}

export async function addExpense(newExpense) {
  const existing = await loadExpenses();
  const updated = [newExpense, ...existing];
  await saveExpenses(updated);
  return updated;
}

export async function deleteExpense(id) {
  const existing = await loadExpenses();
  const updated = existing.filter((e) => e.id !== id);
  await saveExpenses(updated);
  return updated;
}
