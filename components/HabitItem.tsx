import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Habit } from '@/types/habit';

interface Props {
  habit: Habit;
  onToggle: (habitId: string, date: string) => void;
  onDelete: (habitId: string) => void;
}

export default function HabitItem({ habit, onToggle, onDelete }: Props) {
  const today = new Date().toISOString().split('T')[0];
  const isCompleted = habit.completedDates.includes(today);

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={[styles.checkbox, isCompleted && styles.checked]}
        onPress={() => onToggle(habit.id, today)}
      />
      <ThemedText style={styles.name}>{habit.name}</ThemedText>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => onDelete(habit.id)}
      >
        <ThemedText style={styles.deleteText}>✕</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0a7ea4',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#0a7ea4',
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    padding: 5,
  },
  deleteText: {
    color: '#ff0000',
    fontSize: 18,
  },
}); 