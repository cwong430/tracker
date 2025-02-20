export interface Habit {
  id: string;
  name: string;
  createdAt: Date;
  completedDates: string[]; // Store dates as ISO strings
} 