'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createEvent, EventState } from '@/app/lib/actions';
import { useActionState } from 'react';
import MultipleDatesField from '@/app/ui/rehearsal-dates-field';


export default function Form() {
  const initialState: EventState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createEvent, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Event Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Event name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Ex: Summer Gala"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            aria-describedby="name-error"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Event date and time
          </label>
        <input
          id="date"
          name="date"
          type="datetime-local"
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          aria-describedby="date-error"
        />
        <div id="date-error" aria-live="polite" aria-atomic="true">
        {state.errors?.date?.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
         ))}
        </div>
      </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="mb-2 block text-sm font-medium">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="City Hall, Auditorium..."
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>

        {/* Rules */}
        <div className="mb-4">
          <label htmlFor="rules" className="mb-2 block text-sm font-medium">
            Rules (optional)
          </label>
          <textarea
            id="rules"
            name="rules"
            rows={3}
            placeholder="Any rules or instructions..."
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Price (BRL)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>

        {/* Patreon Banner URL */}
        <div className="mb-4">
          <label htmlFor="patreonBanner" className="mb-2 block text-sm font-medium">
            Patreon Banner (URL)
          </label>
          <input
            id="patreonBanner"
            name="patreonBanner"
            type="url"
            placeholder="https://..."
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>

        {/* Rehearsal Dates */}
        <MultipleDatesField />

      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/events"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Event</Button>
      </div>
    </form>
  );
}
