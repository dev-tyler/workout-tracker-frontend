import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddExercise from './page';

// Mock window.alert
window.alert = jest.fn();

describe('AddExercise Page', () => {
  it('renders the form with all fields', () => {
    render(<AddExercise />);

    expect(screen.getByText('Add New Exercise')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Area')).toBeInTheDocument();
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Muscles Worked')).toBeInTheDocument();
    expect(screen.getByLabelText('Video Link (Optional)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add exercise/i })).toBeInTheDocument();
  });

  it('updates input values correctly', () => {
    render(<AddExercise />);

    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Bench Press' } });
    expect(nameInput.value).toBe('Bench Press');

    const areaSelect = screen.getByLabelText('Area') as HTMLSelectElement;
    fireEvent.change(areaSelect, { target: { value: 'pull' } });
    expect(areaSelect.value).toBe('pull');

    const typeSelect = screen.getByLabelText('Type') as HTMLSelectElement;
    fireEvent.change(typeSelect, { target: { value: 'isolation' } });
    expect(typeSelect.value).toBe('isolation');

    const musclesInput = screen.getByLabelText('Muscles Worked') as HTMLInputElement;
    fireEvent.change(musclesInput, { target: { value: 'Pecs' } });
    expect(musclesInput.value).toBe('Pecs');

    const linkInput = screen.getByLabelText('Video Link (Optional)') as HTMLInputElement;
    fireEvent.change(linkInput, { target: { value: 'https://example.com' } });
    expect(linkInput.value).toBe('https://example.com');
  });

  it('submits the form with correct data', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<AddExercise />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Squat' } });
    fireEvent.change(screen.getByLabelText('Area'), { target: { value: 'legs' } });
    fireEvent.change(screen.getByLabelText('Type'), { target: { value: 'compound' } });
    fireEvent.change(screen.getByLabelText('Muscles Worked'), { target: { value: 'Quads, Glutes' } });
    fireEvent.change(screen.getByLabelText('Video Link (Optional)'), { target: { value: 'https://squat.com' } });

    fireEvent.click(screen.getByRole('button', { name: /add exercise/i }));

    expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify({
      name: 'Squat',
      area: 'legs',
      type: 'compound',
      muscles: 'Quads, Glutes',
      link: 'https://squat.com'
    }, null, 2));

    expect(window.alert).toHaveBeenCalledWith('Exercise logged to console!');

    consoleSpy.mockRestore();
  });

  it('validates required fields', () => {
    render(<AddExercise />);

    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
    const musclesInput = screen.getByLabelText('Muscles Worked') as HTMLInputElement;

    expect(nameInput).toBeRequired();
    expect(musclesInput).toBeRequired();
  });
});
