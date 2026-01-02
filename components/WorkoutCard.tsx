import Link from 'next/link';
import { Workout } from '../types';

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const formattedDate = new Date(workout.date).toLocaleDateString();
  const exerciseCount = workout.exercises.length;

  return (
    <Link href={`/workouts/${workout.id}`} className="block">
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
        <h3 className="text-xl font-bold capitalize text-zinc-900 dark:text-zinc-100">{workout.area} Workout</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{formattedDate}</p>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">
          {exerciseCount} Exercise{exerciseCount !== 1 ? 's' : ''}
        </p>
      </div>
    </Link>
  );
};
