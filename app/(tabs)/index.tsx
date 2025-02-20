import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Habit } from '@/types/habit';
import HabitItem from '@/components/HabitItem';

export default function HomeScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);

  const handleToggleHabit = (habitId: string, date: string) => {
    setHabits(currentHabits => 
      currentHabits.map(habit => {
        if (habit.id === habitId) {
          const newCompletedDates = habit.completedDates.includes(date)
            ? habit.completedDates.filter(d => d !== date)
            : [...habit.completedDates, date];
          return { ...habit, completedDates: newCompletedDates };
        }
        return habit;
      })
    );
  };

  const handleAddHabit = () => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: 'New Habit',
      createdAt: new Date(),
      completedDates: [],
    };
    setHabits(current => [...current, newHabit]);
  };

  const handleDeleteHabit = (habitId: string) => {
    setHabits(current => current.filter(habit => habit.id !== habitId));
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>My Habits</ThemedText>
      
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitItem
            habit={item}
            onToggle={handleToggleHabit}
            onDelete={handleDeleteHabit}
          />
        )}
        ListEmptyComponent={() => (
          <ThemedText style={styles.emptyText}>
            No habits yet. Add your first habit!
          </ThemedText>
        )}
      />

      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddHabit}
      >
        <ThemedText style={styles.addButtonText}>+</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 32,
  },
});
