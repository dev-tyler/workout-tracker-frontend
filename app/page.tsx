'use client';

import { useState } from 'react';
import Link from 'next/link';
import { workouts } from '../data/workouts';
import { WorkoutCard } from '../components/WorkoutCard';
import { DateRangeFilter } from '../components/DateRangeFilter';
import { Workout } from '../types';

export default function Home() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Sort workouts by date descending
  const sortedWorkouts = [...workouts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Helper to find latest workout of a type
  const getLatestWorkout = (area: 'push' | 'pull' | 'legs') => {
    return sortedWorkouts.find((w) => w.area === area);
  };

  const latestPush = getLatestWorkout('push');
  const latestPull = getLatestWorkout('pull');
  const latestLegs = getLatestWorkout('legs');

  // Filter workouts based on date range
  const filteredWorkouts = sortedWorkouts.filter((workout) => {
    const workoutDate = new Date(workout.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && workoutDate < start) return false;
    if (end) {
        // Adjust end date to include the full day
        const endOfDay = new Date(end);
        endOfDay.setHours(23, 59, 59, 999);
        if (workoutDate > endOfDay) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 font-sans">
      <main className="max-w-4xl mx-auto space-y-12">

        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">My Workouts</h1>
          <Link href="/add-exercise" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
            Create New Workout
          </Link>
        </div>

        {/* Latest Workouts Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">Latest Workouts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPush ? (
              <WorkoutCard workout={latestPush} />
            ) : (
              <div className="p-4 border border-dashed rounded-lg text-center text-zinc-500">No Push Workout</div>
            )}
            {latestPull ? (
              <WorkoutCard workout={latestPull} />
            ) : (
              <div className="p-4 border border-dashed rounded-lg text-center text-zinc-500">No Pull Workout</div>
            )}
            {latestLegs ? (
              <WorkoutCard workout={latestLegs} />
            ) : (
              <div className="p-4 border border-dashed rounded-lg text-center text-zinc-500">No Legs Workout</div>
            )}
          </div>
        </section>

        {/* Workout History Section */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200">History</h2>
            <DateRangeFilter
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
          </div>

          <div className="space-y-4">
            {filteredWorkouts.length > 0 ? (
              filteredWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))
            ) : (
              <p className="text-zinc-500 dark:text-zinc-400">No workouts found for the selected date range.</p>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}
