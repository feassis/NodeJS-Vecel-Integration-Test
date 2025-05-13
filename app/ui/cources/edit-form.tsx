'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateCourse, CourseState } from '@/app/lib/actions';
import { CoursesField } from '@/app/lib/definitions';
import { useActionState } from 'react';
import MultipleDatesField from '../cources/multipleDates-dates-field';

export default function EditCourseForm({ course }: { course: CoursesField }) {
  const initialState: CourseState = { message: null, errors: {} };
  const updateCourseWithId = updateCourse.bind(null, course.id);
  const [state, formAction] = useActionState(updateCourseWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Course Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">Course Name</label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={course.name}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            aria-describedby="name-error"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Professor */}
        <div className="mb-4">
          <label htmlFor="professor" className="mb-2 block text-sm font-medium">Professor</label>
          <input
            id="professor"
            name="professor"
            type="text"
            defaultValue={course.professor}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>

        {/* Course Dates */}
        <MultipleDatesField />

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="mb-2 block text-sm font-medium">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            defaultValue={course.location}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>

        {/* Rules */}
        <div className="mb-4">
          <label htmlFor="rules" className="mb-2 block text-sm font-medium">Rules</label>
          <textarea
            id="rules"
            name="rules"
            rows={3}
            defaultValue={course.rules}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">Price (BRL)</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            defaultValue={(course.price / 100).toFixed(2)}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/courses" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200">
          Cancel
        </Link>
        <Button type="submit">Edit Course</Button>
      </div>
    </form>
  );
}
