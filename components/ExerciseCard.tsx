'use client';

import { WorkoutExercise } from '../types';

interface ExerciseCardProps {
  exercise: WorkoutExercise;
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const handleEdit = () => {
    // Placeholder for edit functionality
    console.log('Edit exercise:', exercise.id);
    alert(`Edit exercise: ${exercise.name}`);
  };

  return (
    <div className="border rounded-lg p-6 shadow-sm bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{exercise.name}</h3>
        <button
          onClick={handleEdit}
          className="text-sm px-3 py-1 bg-zinc-200 dark:bg-zinc-700 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-900 dark:text-zinc-100"
        >
          Edit
        </button>
      </div>
      <ul className="space-y-2">
        {exercise.sets.map((set, index) => (
          <li key={index} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <span className="font-medium">
              {set.weight}kg x {set.reps}
            </span>
            {set.isWarmup && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-100">
                Warmup
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
