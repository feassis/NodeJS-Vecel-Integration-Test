import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteEvent, deleteCourse } from '@/app/lib/actions';
import Link from 'next/link';

export function CreateEvents() {
  return (
    <Link
      href="/dashboard/events/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Events</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function SubscribeToEvent({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/events/available/${id}`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Inscrever-se</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateEvents({ id }: { id: string }) {
  return (
    <Link
    href={`/dashboard/events/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteEvents({ id }: { id: string }) {
  const deleteEventWithId = deleteEvent.bind(null, id);
  return (
    <>
      <form action={deleteEventWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>

      </form>
    </>
  );
}

export function UpdateCourses({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/courses/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCourses({ id }: { id: string }) {
  const deleteCourseWithId = deleteCourse.bind(null, id);

  return (
    <form action={deleteCourseWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
