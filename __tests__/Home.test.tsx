import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../app/page';
import '@testing-library/jest-dom';

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock the data
jest.mock('../data/workouts', () => ({
  workouts: [
    {
      id: '1',
      date: '2023-10-25T10:00:00Z',
      area: 'push',
      exercises: [],
    },
    {
      id: '2',
      date: '2023-10-26T10:00:00Z',
      area: 'pull',
      exercises: [],
    },
    {
      id: '3',
      date: '2023-10-27T10:00:00Z',
      area: 'legs',
      exercises: [],
    },
    {
      id: '4',
      date: '2023-10-01T10:00:00Z',
      area: 'push',
      exercises: [],
    },
  ],
}));

describe('Home Page', () => {
  it('renders the latest workouts', () => {
    render(<Home />);

    expect(screen.getByText('Latest Workouts')).toBeInTheDocument();

    // There can be multiple workouts of the same type, so we use getAllByText
    expect(screen.getAllByText('push Workout', { selector: 'h3' })[0]).toBeInTheDocument();
    expect(screen.getAllByText('pull Workout', { selector: 'h3' })[0]).toBeInTheDocument();
    expect(screen.getAllByText('legs Workout', { selector: 'h3' })[0]).toBeInTheDocument();
  });

  it('excludes latest workouts from history by default', () => {
    render(<Home />);
    expect(screen.getByText('History')).toBeInTheDocument();

    // Latest workouts (Push ID 1, Pull ID 2, Legs ID 3) should NOT be in history
    // History should only contain the older Push workout (ID 4)
    // We can check by date: 10/1/2023 is ID 4.
    // ID 1 (10/25), ID 2 (10/26), ID 3 (10/27) are latest.

    // Note: Our mock data has 4 workouts. 1 Push, 1 Pull, 1 Legs, 1 Old Push.
    // So Latest = ID 1 (Push), ID 2 (Pull), ID 3 (Legs).
    // History should only show ID 4.

    // We can check dates rendered in history section.
    // But getAllByText might find them in Latest too.
    // We need to scope to the History section.
    // Since we don't have easy section scopes without test-ids, let's count occurrences.

    // "10/25/2023" (Latest Push) -> Should appear ONCE (in Latest)
    // "10/01/2023" (Old Push) -> Should appear ONCE (in History)

    expect(screen.getAllByText('10/25/2023')).toHaveLength(1);
    expect(screen.getAllByText('10/1/2023')).toHaveLength(1);
  });

  it('includes latest workouts in history when date filter is active', () => {
    render(<Home />);

    const startDateInput = screen.getByLabelText('Start Date');
    const endDateInput = screen.getByLabelText('End Date');

    fireEvent.change(startDateInput, { target: { value: '2023-10-26' } });
    fireEvent.change(endDateInput, { target: { value: '2023-10-27' } });

    // Should show pull (26th) and legs (27th).
    // These ARE the latest workouts, but since filter is active, they SHOULD appear in history.

    // So "10/26/2023" should appear TWICE (Latest Pull + History Pull)
    expect(screen.getAllByText('10/26/2023')).toHaveLength(2);

    // "10/25/2023" (Push) is outside range, so only ONCE (Latest Push)
    expect(screen.getAllByText('10/25/2023')).toHaveLength(1);
  });

  it('renders create workout button', () => {
      render(<Home />);
      const createBtn = screen.getByText('Create New Workout');
      expect(createBtn).toBeInTheDocument();
      expect(createBtn).toHaveAttribute('href', '/add-exercise');
  });
});
