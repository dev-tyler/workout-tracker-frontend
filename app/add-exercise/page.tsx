'use client';

import { useState } from 'react';
import { styles } from './styles';

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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <h2 className={styles.heading}>
            Add New Exercise
          </h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <div>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={styles.input}
                placeholder="Exercise Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="area" className={styles.label}>
                Area
              </label>
              <select
                id="area"
                name="area"
                className={styles.input}
                value={formData.area}
                onChange={handleChange}
              >
                <option value="push">Push</option>
                <option value="pull">Pull</option>
                <option value="legs">Legs</option>
              </select>
            </div>
            <div>
              <label htmlFor="type" className={styles.label}>
                Type
              </label>
              <select
                id="type"
                name="type"
                className={styles.input}
                value={formData.type}
                onChange={handleChange}
              >
                <option value="compound">Compound</option>
                <option value="isolation">Isolation</option>
              </select>
            </div>
            <div>
              <label htmlFor="muscles" className={styles.label}>
                Muscles Worked
              </label>
              <input
                id="muscles"
                name="muscles"
                type="text"
                required
                className={styles.input}
                placeholder="e.g. Chest, Triceps"
                value={formData.muscles}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="equipment" className={styles.label}>
                Equipment Needed
              </label>
              <input
                id="equipment"
                name="equipment"
                type="text"
                className={styles.input}
                placeholder="e.g. Barbell, Dumbbells"
                value={formData.equipment}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="link" className={styles.label}>
                Video Link (Optional)
              </label>
              <input
                id="link"
                name="link"
                type="url"
                className={styles.input}
                placeholder="https://youtube.com/..."
                value={formData.link}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={styles.button}
            >
              Add Exercise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
