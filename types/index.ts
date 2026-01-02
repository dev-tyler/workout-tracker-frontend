export type Area = 'push' | 'pull' | 'legs';

export interface Set {
  weight: number;
  reps: number;
  isWarmup: boolean;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  sets: Set[];
}

export interface Workout {
  id: string;
  date: string; // ISO string
  area: Area;
  exercises: WorkoutExercise[];
}
