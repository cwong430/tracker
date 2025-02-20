import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HabitList from './src/components/HabitList';
import { Habit } from './src/types/habit';

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState('');

  const addHabit = () => {
    if (newHabitName.trim()) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: newHabitName.trim(),
        createdAt: new Date(),
        completedDates: [],
      };
      setHabits([...habits, newHabit]);
      setNewHabitName('');
    }
  };

  const toggleHabit = (habitId: string, date: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const completedDates = habit.completedDates.includes(date)
          ? habit.completedDates.filter(d => d !== date)
          : [...habit.completedDates, date];
        return { ...habit, completedDates };
      }
      return habit;
    }));
  };

  const deleteHabit = (habitId: string) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newHabitName}
          onChangeText={setNewHabitName}
          placeholder="Enter new habit"
        />
        <Button title="Add" onPress={addHabit} />
      </View>
      <HabitList
        habits={habits}
        onToggleHabit={toggleHabit}
        onDeleteHabit={deleteHabit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
}); 