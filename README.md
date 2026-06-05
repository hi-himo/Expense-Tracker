# 💸 Expense Tracker App
### A beginner-friendly React Native + Expo project

---

## 📁 Project Folder Structure

```
ExpenseTracker/
├── App.js                          ← Entry point of the app
├── app.json                        ← Expo config (app name, icon, etc.)
├── package.json                    ← Dependencies list
├── babel.config.js                 ← Babel config (required by Expo)
└── src/
    ├── components/
    │   ├── ExpenseCard.js          ← Reusable card for one expense
    │   ├── SummaryCard.js          ← Card for balance/income/expense totals
    │   └── CategoryFilter.js       ← Horizontal filter buttons
    ├── screens/
    │   ├── DashboardScreen.js      ← Home screen with summary + recent
    │   ├── AddExpenseScreen.js     ← Form to add a new expense
    │   └── ExpenseListScreen.js    ← Full list with category filter
    ├── navigation/
    │   └── AppNavigator.js         ← Tab + Stack navigation setup
    └── storage/
        └── expenseStorage.js       ← AsyncStorage CRUD helpers
```

---

## 🚀 Setup & Installation (Step-by-Step)

### Step 1 — Install Node.js
Download from https://nodejs.org (LTS version recommended).

### Step 2 — Install Expo CLI globally
```bash
npm install -g expo-cli
```

### Step 3 — Create the project folder
```bash
mkdir ExpenseTracker
cd ExpenseTracker
```

### Step 4 — Copy all files into the project
Place all the files from this project into their correct locations
as shown in the folder structure above.

### Step 5 — Install dependencies
```bash
npm install
```

This installs everything listed in `package.json`:

| Package | What it does |
|---------|-------------|
| `expo` | The Expo SDK and toolchain |
| `react-native` | Core React Native framework |
| `@react-navigation/native` | Navigation library base |
| `@react-navigation/native-stack` | Stack (push/pop) navigation |
| `@react-navigation/bottom-tabs` | Bottom tab bar navigation |
| `@react-native-async-storage/async-storage` | Local storage (like localStorage) |
| `react-native-screens` | Native screen performance |
| `react-native-safe-area-context` | Safe area for notches/status bar |
| `expo-status-bar` | Controls the status bar style |

### Step 6 — Start the app
```bash
npx expo start
```

This opens the Expo Developer Tools in your terminal.

### Step 7 — Run on your device
- **On Android**: Install the **Expo Go** app → scan the QR code
- **On iOS**: Install the **Expo Go** app → scan the QR code
- **On Emulator**: Press `a` for Android emulator, `i` for iOS simulator

---

## 🧠 How The App Works (Beginner Explanation)

### Navigation
The app uses two kinds of navigation:

1. **Bottom Tab Navigator** — The bar at the bottom of the screen. Tap to switch between Dashboard and All Expenses.
2. **Stack Navigator** — Wraps the tabs. The Add Expense screen "pushes" on top of everything like a modal.

### State Management
We use React's built-in `useState` hook — no Redux or Context needed.
Each screen manages its own list of expenses locally.

### Data Persistence
AsyncStorage works like a tiny database on the phone.
- We convert expenses array → JSON string → store with a key
- When loading: read the key → parse JSON string → get the array back

### Screen Flow
```
App starts
  └── AppNavigator
        ├── BottomTabs (default)
        │     ├── DashboardScreen  ← "Home" tab
        │     └── ExpenseListScreen ← "All Expenses" tab
        └── AddExpenseScreen  ← opens as modal from either tab
```

---

## ✨ Features

| Feature | Where |
|---------|-------|
| Total balance display | Dashboard |
| Income vs Expense summary | Dashboard |
| Recent expenses (last 4) | Dashboard |
| Add new expense | AddExpense screen |
| Category selection | AddExpense screen |
| Full expense list | ExpenseList screen |
| Filter by category | ExpenseList screen |
| Delete expense | Both list screens |
| Data persists on restart | AsyncStorage |
| Pull to refresh | Dashboard + ExpenseList |

---

## 🎨 Design Decisions

- **White/light gray background** (#F7F8FA) — clean and easy on eyes
- **Dark accent color** (#1a1a1a) — strong, readable, not harsh black
- **Red for expenses** (#E53935) — universally understood as spending
- **Green for income** (#2E7D32) — universally understood as positive
- **Rounded corners** (12-16px) — modern, friendly feel
- **Subtle shadows** — add depth without complexity
- **Emoji icons** — no icon library needed, works everywhere

---

## 🛠️ How to Extend This App (Next Steps)

Here are ideas for when you're comfortable with the basics:

1. **Add a date picker** — Use `expo-datetime-picker` instead of text input
2. **Add charts** — Use `react-native-chart-kit` to show spending by category
3. **Add income tracking** — Create an "Add Income" form like Add Expense
4. **Add budget limits** — Set monthly limits per category and show alerts
5. **Export to CSV** — Use `expo-sharing` to share data as a file
6. **Dark mode** — Use `useColorScheme` hook to detect system theme

---

## ❓ Common Issues

**App won't start:**
→ Make sure Node.js is installed: `node --version`
→ Run `npm install` again

**Expo Go can't connect:**
→ Make sure your phone and computer are on the **same Wi-Fi network**

**AsyncStorage not working:**
→ Make sure the package was installed: `npm install @react-native-async-storage/async-storage`

**Navigation errors:**
→ Make sure both `react-native-screens` and `react-native-safe-area-context` are installed

---

## 📚 Learning Resources

- React Native Docs: https://reactnative.dev/docs/getting-started
- Expo Docs: https://docs.expo.dev
- React Navigation: https://reactnavigation.org/docs/getting-started
- AsyncStorage: https://react-native-async-storage.github.io/async-storage/

---

*Built as a 12-day internship beginner project. Happy coding! 🚀*
