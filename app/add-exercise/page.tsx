'use client';

import { useState } from 'react';

export default function AddExercise() {
  const [formData, setFormData] = useState({
    name: '',
    area: 'push',
    type: 'compound',
    muscles: '',
    equipment: '',
    link: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(formData, null, 2));
    alert('Exercise logged to console!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Exercise
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1"
                placeholder="Exercise Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                Area
              </label>
              <select
                id="area"
                name="area"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                value={formData.area}
                onChange={handleChange}
              >
                <option value="push">Push</option>
                <option value="pull">Pull</option>
                <option value="legs">Legs</option>
              </select>
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                id="type"
                name="type"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="compound">Compound</option>
                <option value="isolation">Isolation</option>
              </select>
            </div>
            <div>
              <label htmlFor="muscles" className="block text-sm font-medium text-gray-700">
                Muscles Worked
              </label>
              <input
                id="muscles"
                name="muscles"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1"
                placeholder="e.g. Chest, Triceps"
                value={formData.muscles}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="equipment" className="block text-sm font-medium text-gray-700">
                Equipment Needed
              </label>
              <input
                id="equipment"
                name="equipment"
                type="text"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1"
                placeholder="e.g. Barbell, Dumbbells"
                value={formData.equipment}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                Video Link (Optional)
              </label>
              <input
                id="link"
                name="link"
                type="url"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1"
                placeholder="https://youtube.com/..."
                value={formData.link}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Exercise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
