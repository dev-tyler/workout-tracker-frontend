import { workouts } from '../../../data/workouts';
import { ExerciseCard } from '../../../components/ExerciseCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetail({ params }: Props) {
  const { id } = await params;
  const workout = workouts.find((w) => w.id === id);

  if (!workout) {
    notFound();
  }

  const formattedDate = new Date(workout.date).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 font-sans">
      <main className="max-w-3xl mx-auto">
        <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Workouts</Link>
            <h1 className="text-4xl font-bold capitalize text-zinc-900 dark:text-zinc-100">{workout.area} Workout</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mt-2">{formattedDate}</p>
        </div>

        <div className="space-y-6">
            {workout.exercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
        </div>
      </main>
    </div>
  );
}
