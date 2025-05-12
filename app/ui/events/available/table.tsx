import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredEvents } from '@/app/lib/data';
import { FutureEventsToggle } from '@/app/ui/events/available/future-toggle';
import { SubscribeToEvent } from '../buttons';

export default async function EventTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  
  const events = await fetchFilteredEvents(query, currentPage, true);

  return (
    <div>
      <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile */}
          <div className="md:hidden">
            {events?.map((event) => (
              <div
                key={event.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="border-b pb-4">
                  <h2 className="text-lg font-semibold">{event.name}</h2>
                  <p className="text-sm text-gray-500">{event.location}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p
                      className={`text-sm ${
                            new Date(event.date) < new Date() ? 'text-red-600 font-semibold' : ''
                        }`
                      }>
                        {formatDateToLocal(event.date)}
                      </p>
                    
                    <p className="text-sm text-gray-600">
                      {formatCurrency(event.price)}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <SubscribeToEvent id={event.id}></SubscribeToEvent>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Name</th>
                <th className="px-3 py-5 font-medium">Date</th>
                <th className="px-3 py-5 font-medium">Location</th>
                <th className="px-3 py-5 font-medium">Price</th>
                <th className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {events?.map((event) => (
                <tr
                  key={event.id}
                  className="border-b text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {event.name}
                  </td>
                  <td
                    className={`whitespace-nowrap px-3 py-3 ${
                      new Date(event.date) < new Date() ? 'text-red-600 font-semibold' : ''
                      }`}
                      >
                        {formatDateToLocal(event.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {event.location}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(event.price)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <div className="flex justify-end gap-2">
                        <SubscribeToEvent id={event.id}></SubscribeToEvent>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    
  );
}
