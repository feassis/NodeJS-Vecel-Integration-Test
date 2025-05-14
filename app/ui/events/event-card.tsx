'use client';

import { EventField } from '@/app/lib/definitions';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';

export default function PublicEventCard({ event }: { event: EventField }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-4">
        {event.patreon_banner && (
        <div className="mt-4">
          <img
            src={event.patreon_banner}
            alt="Patreon Banner"
            className="w-full max-h-48 object-cover rounded"
          />
        </div>
      )}
        
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Coluna 1 */}
  <div>
    <h2 className="text-xl font-semibold">{event.name}</h2>
    <p className="text-sm text-gray-600">{event.location}</p>
    <p className="text-sm text-gray-600">
      Event Date: <span className="font-medium">{formatDateToLocal(event.date)}</span>
    </p>
  </div>

  {/* Coluna 2 */}
  <div>
    <div className="mb-4">
      
      <p className="text-sm">
        <span className="font-medium">Price:</span> {formatCurrency(event.price)}
      </p>
    </div>

    {event.rehearsal_dates.length > 0 && (
  <div className="mb-4">
    <p className="font-medium text-sm">Rehearsal Dates:</p>
    <ul className="list-disc list-inside text-sm text-gray-700">
      {event.rehearsal_dates.map((date, index) => (
        <li key={index}>
          {new Date(date).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </li>
      ))}
    </ul>
  </div>
)}
  </div>
</div>
      <p className="text-sm">
        <span className="font-medium">Rules:</span> {event.rules}
      </p>
    </div>
  );
}
