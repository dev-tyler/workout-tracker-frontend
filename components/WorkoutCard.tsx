import Link from 'next/link';
import { Workout } from '../types';

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  // Use fixed locale and timezone to prevent hydration mismatches
  const formattedDate = new Date(workout.date).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/workouts/${workout.id}`} className="block h-full">
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 h-full flex flex-col">
        <div className="mb-4">
            <h3 className="text-xl font-bold capitalize text-zinc-900 dark:text-zinc-100">{workout.area} Workout</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{formattedDate}</p>
        </div>

        <div className="flex-grow space-y-2">
            {workout.exercises.map((exercise) => {
                // Logic to find best set: Max Weight, then Max Reps
                // Filter out warmups? User said "heaviest weight I performed". usually implies work sets.
                // But let's look at all sets just in case.
                const sets = exercise.sets;
                if (sets.length === 0) return null;

                // Find max weight
                const maxWeight = Math.max(...sets.map(s => s.weight));

                // Find sets with max weight
                const setsAtMaxWeight = sets.filter(s => s.weight === maxWeight);

                // Find max reps at max weight
                const maxReps = Math.max(...setsAtMaxWeight.map(s => s.reps));

                return (
                    <div key={exercise.id} className="flex justify-between items-center text-sm border-b border-zinc-100 dark:border-zinc-700 last:border-0 pb-1 last:pb-0">
                        <span className="font-medium text-zinc-800 dark:text-zinc-200 truncate pr-2 flex-1">{exercise.name}</span>
                        <div className="flex gap-4 text-zinc-600 dark:text-zinc-400 shrink-0">
                            <span className="w-12 text-right">{maxWeight}kg</span>
                            <span className="w-8 text-right">{maxReps}</span>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </Link>
  );
};
