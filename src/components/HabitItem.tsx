import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Habit } from '../types/habit';

interface Props {
  habit: Habit;
  onToggle: (habitId: string, date: string) => void;
  onDelete: (habitId: string) => void;
}

const HabitItem = ({ habit, onToggle, onDelete }: Props) => {
  const today = new Date().toISOString().split('T')[0];
  const isCompleted = habit.completedDates.includes(today);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkbox, isCompleted && styles.checked]}
        onPress={() => onToggle(habit.id, today)}
      />
      <Text style={styles.name}>{habit.name}</Text>
      <TouchableOpacity onPress={() => onDelete(habit.id)}>
        <Text style={styles.deleteButton}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#666',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#666',
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    fontSize: 18,
    color: '#ff0000',
  },
});

export default HabitItem; 