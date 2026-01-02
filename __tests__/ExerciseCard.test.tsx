import { render, screen, fireEvent } from '@testing-library/react';
import { ExerciseCard } from '../components/ExerciseCard';
import '@testing-library/jest-dom';
import { WorkoutExercise } from '../types';

describe('ExerciseCard', () => {
  const mockExercise: WorkoutExercise = {
    id: 'test-1',
    name: 'Test Exercise',
    sets: [
      { weight: 100, reps: 5, isWarmup: false },
      { weight: 50, reps: 10, isWarmup: true },
    ],
  };

  it('renders exercise name', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    expect(screen.getByText('Test Exercise')).toBeInTheDocument();
  });

  it('renders sets correctly', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    expect(screen.getByText('100kg x 5')).toBeInTheDocument();
    expect(screen.getByText('50kg x 10')).toBeInTheDocument();
  });

  it('shows warmup tag for warmup sets', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    expect(screen.getByText('Warmup')).toBeInTheDocument();
  });

  it('calls console.log when edit button is clicked (mocked)', () => {
    const logSpy = jest.spyOn(console, 'log');
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<ExerciseCard exercise={mockExercise} />);

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(logSpy).toHaveBeenCalledWith('Edit exercise:', 'test-1');
    expect(alertSpy).toHaveBeenCalledWith('Edit exercise: Test Exercise');

    logSpy.mockRestore();
    alertSpy.mockRestore();
  });
});
