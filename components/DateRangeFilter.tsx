'use client';

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export const DateRangeFilter = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangeFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
      <div className="flex flex-col">
        <label htmlFor="start-date" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Start Date</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="border rounded px-3 py-2 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="end-date" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">End Date</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="border rounded px-3 py-2 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
        />
      </div>
    </div>
  );
};
