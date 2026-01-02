import { Workout } from '../types';

export const workouts: Workout[] = [
  {
    id: '1',
    date: '2023-10-25T10:00:00Z',
    area: 'push',
    exercises: [
      {
        id: 'ex1',
        name: 'Bench Press',
        sets: [
          { weight: 40, reps: 10, isWarmup: true },
          { weight: 60, reps: 8, isWarmup: false },
          { weight: 80, reps: 6, isWarmup: false },
        ],
      },
      {
        id: 'ex2',
        name: 'Overhead Press',
        sets: [
          { weight: 30, reps: 10, isWarmup: true },
          { weight: 40, reps: 8, isWarmup: false },
        ],
      },
    ],
  },
  {
    id: '2',
    date: '2023-10-26T10:00:00Z',
    area: 'pull',
    exercises: [
      {
        id: 'ex3',
        name: 'Deadlift',
        sets: [
          { weight: 60, reps: 10, isWarmup: true },
          { weight: 100, reps: 5, isWarmup: false },
        ],
      },
      {
        id: 'ex4',
        name: 'Pull Ups',
        sets: [
          { weight: 0, reps: 10, isWarmup: false },
          { weight: 0, reps: 8, isWarmup: false },
        ],
      },
    ],
  },
  {
    id: '3',
    date: '2023-10-27T10:00:00Z',
    area: 'legs',
    exercises: [
      {
        id: 'ex5',
        name: 'Squat',
        sets: [
          { weight: 60, reps: 10, isWarmup: true },
          { weight: 100, reps: 5, isWarmup: false },
        ],
      },
      {
        id: 'ex6',
        name: 'Lunges',
        sets: [
          { weight: 20, reps: 12, isWarmup: false },
          { weight: 20, reps: 12, isWarmup: false },
        ],
      },
    ],
  },
  {
    id: '4',
    date: '2023-10-22T10:00:00Z',
    area: 'push',
    exercises: [
      {
        id: 'ex7',
        name: 'Incline Bench Press',
        sets: [
          { weight: 50, reps: 8, isWarmup: false },
        ],
      },
    ],
  },
  {
    id: '5',
    date: '2023-10-20T10:00:00Z',
    area: 'legs',
    exercises: [
      {
        id: 'ex8',
        name: 'Leg Press',
        sets: [
          { weight: 150, reps: 10, isWarmup: false },
        ],
      },
    ],
  },
];
