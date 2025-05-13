'use client';

import { useState, useEffect, useRef } from 'react';

interface MultipleDatesFieldProps {
  name?: string;
  initialDates?: string[];
  label?: string;
}

export default function MultipleDatesField({
  name = 'dates',
  initialDates = [''],
  label = 'Dates and Times',
}: MultipleDatesFieldProps) {
  const [dates, setDates] = useState<string[]>(initialDates);
  const initialized = useRef(false);

   useEffect(() => {
    if (!initialized.current) {
      setDates(initialDates.length > 0 ? initialDates : ['']);
      initialized.current = true;
    }
  }, [initialDates]);

  const handleChange = (index: number, value: string) => {
    const updated = [...dates];
    updated[index] = value;
    setDates(updated);
  };

  const addField = () => {
    setDates([...dates, '']);
  };

  const removeField = (index: number) => {
    const updated = dates.filter((_, i) => i !== index);
    setDates(updated.length > 0 ? updated : ['']);
  };

  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium">{label}</label>
      {dates.map((date, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            type="datetime-local"
            name={name}
            value={date}
            onChange={(e) => handleChange(index, e.target.value)}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
          {dates.length > 1 && (
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