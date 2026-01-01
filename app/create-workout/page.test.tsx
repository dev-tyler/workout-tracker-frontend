import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateWorkout from './page';

// Mock window.alert and crypto.randomUUID
window.alert = jest.fn();
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => Math.random().toString(36).substring(7),
  },
});

describe('CreateWorkout Page', () => {
  it('renders the initial state', () => {
    render(<CreateWorkout />);
    expect(screen.getByText('Create New Workout')).toBeInTheDocument();
    expect(screen.getByLabelText('Target Area')).toBeInTheDocument();
    expect(screen.queryByText('Add Exercise')).not.toBeInTheDocument();
  });

  it('allows selecting an area', () => {
    render(<CreateWorkout />);
    const areaSelect = screen.getByLabelText('Target Area');

    fireEvent.change(areaSelect, { target: { value: 'push' } });

    expect(screen.getByText('Add Exercise')).toBeInTheDocument();
    expect(screen.getByLabelText('Add Exercise')).toBeInTheDocument();
  });

  it('filters exercises based on area', () => {
    render(<CreateWorkout />);
    const areaSelect = screen.getByLabelText('Target Area');

    fireEvent.change(areaSelect, { target: { value: 'push' } });
    const exerciseSelect = screen.getByLabelText('Add Exercise');

    // Check for push exercises
    expect(screen.getByText('Bench Press')).toBeInTheDocument();
    expect(screen.queryByText('Squat')).not.toBeInTheDocument(); // Squat is legs
  });

  it('allows adding an exercise', () => {
    render(<CreateWorkout />);
    fireEvent.change(screen.getByLabelText('Target Area'), { target: { value: 'push' } });

    fireEvent.change(screen.getByLabelText('Add Exercise'), { target: { value: '1' } }); // Bench Press ID
    fireEvent.click(screen.getByText('Add'));

    expect(screen.getByText('1. Bench Press')).toBeInTheDocument();
  });

  it('allows adding sets to an exercise', () => {
    render(<CreateWorkout />);
    fireEvent.change(screen.getByLabelText('Target Area'), { target: { value: 'push' } });
    fireEvent.change(screen.getByLabelText('Add Exercise'), { target: { value: '1' } });
    fireEvent.click(screen.getByText('Add'));

    fireEvent.click(screen.getByText('+ Add Set'));

    expect(screen.getByRole('checkbox')).toBeInTheDocument(); // Warmup
    expect(screen.getAllByRole('spinbutton')).toHaveLength(2); // Weight and Reps
  });

  it('allows updating set details', () => {
    render(<CreateWorkout />);
    fireEvent.change(screen.getByLabelText('Target Area'), { target: { value: 'push' } });
    fireEvent.change(screen.getByLabelText('Add Exercise'), { target: { value: '1' } });
    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getByText('+ Add Set'));

    const weightInput = screen.getByLabelText('Weight for set Bench Press');
    const repsInput = screen.getByLabelText('Reps for set Bench Press');
    const warmupCheckbox = screen.getByLabelText('Warmup for set Bench Press');

    fireEvent.change(weightInput, { target: { value: '100' } });
    fireEvent.change(repsInput, { target: { value: '5' } });
    fireEvent.click(warmupCheckbox);

    expect(weightInput).toHaveValue(100);
    expect(repsInput).toHaveValue(5);
    expect(warmupCheckbox).toBeChecked();
  });

  it('logs workout data on save', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<CreateWorkout />);

    // Flow: Select Push -> Add Bench Press -> Add Set -> Save
    fireEvent.change(screen.getByLabelText('Target Area'), { target: { value: 'push' } });
    fireEvent.change(screen.getByLabelText('Add Exercise'), { target: { value: '1' } });
    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getByText('+ Add Set'));

    // Fill data
    const weightInput = screen.getByLabelText('Weight for set Bench Press');
    fireEvent.change(weightInput, { target: { value: '60' } });

    fireEvent.click(screen.getByText('Save Workout'));

    expect(consoleSpy).toHaveBeenCalled();
    const loggedData = JSON.parse(consoleSpy.mock.calls[0][0]);
    expect(loggedData.area).toBe('push');
    expect(loggedData.exercises).toHaveLength(1);
    expect(loggedData.exercises[0].name).toBe('Bench Press');
    expect(loggedData.exercises[0].sets).toHaveLength(1);
    expect(loggedData.exercises[0].sets[0].weight).toBe(60);

    consoleSpy.mockRestore();
  });
});
