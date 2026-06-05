// src/components/CategoryFilter.js
// FIX: Use alignItems:'center' and fixed pill height so they never stretch tall.

import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const CATEGORIES = ['All', 'Food', 'Travel', 'Shopping', 'Bills', 'Other'];

export default function CategoryFilter({ selected, onSelect }) {
  return (
    // Wrap in a fixed-height View so the ScrollView never expands vertically
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {CATEGORIES.map((cat) => {
          const isActive = selected === cat;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => onSelect(cat)}
              style={[styles.pill, isActive && styles.pillActive]}
            >
              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Fixed height wrapper — this is the KEY fix for the stretching bug
  wrapper: {
    height: 50,
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 16,
    alignItems: 'center', // Keep pills vertically centered
    flexDirection: 'row',
  },
  pill: {
    height: 34,                // Fixed height — never grows
    paddingHorizontal: 16,
    borderRadius: 17,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillActive: {
    backgroundColor: '#1a1a1a',
  },
  pillText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  pillTextActive: {
    color: '#fff',
  },
});
