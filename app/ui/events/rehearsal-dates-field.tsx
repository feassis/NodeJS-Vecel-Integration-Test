'use client';

import { useState } from 'react';

export default function RehearsalDatesField() {
  const [rehearsalDates, setRehearsalDates] = useState<string[]>(['']);

  const handleChange = (index: number, value: string) => {
    const updatedDates = [...rehearsalDates];
    updatedDates[index] = value;
    setRehearsalDates(updatedDates);
  };

  const addField = () => {
    setRehearsalDates([...rehearsalDates, '']);
  };

  const removeField = (index: number) => {
    const updatedDates = rehearsalDates.filter((_, i) => i !== index);
    setRehearsalDates(updatedDates);
  };

  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium">Rehearsal Dates and Times</label>
      {rehearsalDates.map((date, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            type="datetime-local"
            name="rehearsalDates"
            value={date}
            onChange={(e) => handleChange(index, e.target.value)}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
          {rehearsalDates.length > 1 && (
            <button
              type="button"
              onClick={() => removeField(index)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addField}
        className="mt-2 text-blue-500 text-sm hover:underline"
      >
        + Add another date
      </button>
    </div>
  );
}
