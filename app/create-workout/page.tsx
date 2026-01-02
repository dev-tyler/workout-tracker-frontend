'use client';

import { useState } from 'react';
import { styles } from './styles';

type Area = 'push' | 'pull' | 'legs';

type Set = {
  id: string;
  isWarmup: boolean;
  weight: string | number;
  reps: string | number;
};

type WorkoutExercise = {
  id: string; // unique id for this instance in the workout
  exerciseId: string;
  name: string;
  sets: Set[];
};

// Dummy data for exercises (eventually this will come from the saved exercises)
const DUMMY_EXERCISES = [
  { id: '1', name: 'Bench Press', area: 'push' },
  { id: '2', name: 'Overhead Press', area: 'push' },
  { id: '3', name: 'Tricep Extension', area: 'push' },
  { id: '4', name: 'Pull Up', area: 'pull' },
  { id: '5', name: 'Barbell Row', area: 'pull' },
  { id: '6', name: 'Bicep Curl', area: 'pull' },
  { id: '7', name: 'Squat', area: 'legs' },
  { id: '8', name: 'Deadlift', area: 'legs' },
  { id: '9', name: 'Lunge', area: 'legs' },
];

export default function CreateWorkout() {
  const [selectedArea, setSelectedArea] = useState<Area | ''>('');
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState('');

  const availableExercises = DUMMY_EXERCISES.filter(
    (ex) => ex.area === selectedArea
  );

  const handleAddExercise = () => {
    if (!selectedExerciseId) return;
    const exerciseDef = DUMMY_EXERCISES.find((ex) => ex.id === selectedExerciseId);
    if (!exerciseDef) return;

    const newExercise: WorkoutExercise = {
      id: crypto.randomUUID(),
      exerciseId: exerciseDef.id,
      name: exerciseDef.name,
      sets: [],
    };

    setWorkoutExercises([...workoutExercises, newExercise]);
    setSelectedExerciseId('');
  };

  const handleAddSet = (workoutExerciseId: string) => {
    setWorkoutExercises((prev) =>
      prev.map((we) => {
        if (we.id !== workoutExerciseId) return we;
        if (we.sets.length >= 20) return we; // Limit to 20 sets

        const newSet: Set = {
          id: crypto.randomUUID(),
          isWarmup: false,
          weight: '',
          reps: '',
        };
        return { ...we, sets: [...we.sets, newSet] };
      })
    );
  };

  const updateSet = (
    workoutExerciseId: string,
    setId: string,
    field: keyof Set,
    value: any
  ) => {
    setWorkoutExercises((prev) =>
      prev.map((we) => {
        if (we.id !== workoutExerciseId) return we;
        return {
          ...we,
          sets: we.sets.map((set) => {
            if (set.id !== setId) return set;
            return { ...set, [field]: value };
          }),
        };
      })
    );
  };

  const handleSaveWorkout = () => {
    const workoutData = {
      area: selectedArea,
      exercises: workoutExercises.map((ex) => ({
        ...ex,
        sets: ex.sets.map((s) => ({
          ...s,
          weight: Number(s.weight) || 0,
          reps: Number(s.reps) || 0,
        })),
      })),
      date: new Date().toISOString(),
    };
    console.log(JSON.stringify(workoutData, null, 2));
    alert('Workout saved to console!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <h2 className={styles.heading}>Create New Workout</h2>
        </div>

        {/* Step 1: Select Area */}
        <div className={styles.section}>
          <label htmlFor="area-select" className={styles.label}>
            Target Area
          </label>
          <select
            id="area-select"
            className={styles.select}
            value={selectedArea}
            onChange={(e) => {
              setSelectedArea(e.target.value as Area);
              setWorkoutExercises([]); // Reset if area changes
            }}
          >
            <option value="">Select an area...</option>
            <option value="push">Push</option>
            <option value="pull">Pull</option>
            <option value="legs">Legs</option>
          </select>
        </div>

        {/* Step 2: Workout View */}
        {selectedArea && (
          <div className={styles.section}>
            <div className="flex gap-4 items-end">
              <div className="flex-grow">
                <label htmlFor="exercise-select" className={styles.label}>
                  Add Exercise
                </label>
                <select
                  id="exercise-select"
                  className={styles.select}
                  value={selectedExerciseId}
                  onChange={(e) => setSelectedExerciseId(e.target.value)}
                >
                  <option value="">Select an exercise...</option>
                  {availableExercises.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAddExercise}
                className={styles.buttonSecondary}
                disabled={!selectedExerciseId}
              >
                Add
              </button>
            </div>

            <div className="space-y-6">
              {workoutExercises.map((we, index) => (
                <div key={we.id} className={styles.exerciseCard}>
                  <div className={styles.exerciseHeader}>
                    <h3 className={styles.exerciseTitle}>
                      {index + 1}. {we.name}
                    </h3>
                  </div>

                  {we.sets.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th className={styles.th}>Warmup</th>
                            <th className={styles.th}>Weight (kg)</th>
                            <th className={styles.th}>Reps</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {we.sets.map((set) => (
                            <tr key={set.id}>
                              <td className={styles.td}>
                                <input
                                  type="checkbox"
                                  className={styles.checkbox}
                                  checked={set.isWarmup}
                                  onChange={(e) =>
                                    updateSet(we.id, set.id, 'isWarmup', e.target.checked)
                                  }
                                  aria-label={`Warmup for set ${we.name}`}
                                />
                              </td>
                              <td className={styles.td}>
                                <input
                                  type="number"
                                  className={styles.input}
                                  value={set.weight}
                                  onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                                  onChange={(e) =>
                                    updateSet(
                                      we.id,
                                      set.id,
                                      'weight',
                                      e.target.value
                                    )
                                  }
                                  aria-label={`Weight for set ${we.name}`}
                                />
                              </td>
                              <td className={styles.td}>
                                <input
                                  type="number"
                                  className={styles.input}
                                  value={set.reps}
                                  onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                                  onChange={(e) =>
                                    updateSet(
                                      we.id,
                                      set.id,
                                      'reps',
                                      e.target.value
                                    )
                                  }
                                  aria-label={`Reps for set ${we.name}`}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <button
                    onClick={() => handleAddSet(we.id)}
                    className="mt-2 text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    + Add Set
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button onClick={handleSaveWorkout} className={styles.buttonPrimary}>
                Save Workout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
