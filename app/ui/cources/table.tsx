import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredCourses } from '@/app/lib/data'; // você precisa criar essa função
import { UpdateCourses, DeleteCourses } from '@/app/ui/cources/buttons'; // você também precisa criar esses botões

export default async function CoursesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const courses = await fetchFilteredCourses(query, currentPage, false);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile */}
          <div className="md:hidden">
            {courses?.map((course) => (
              <div
                key={course.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="border-b pb-4">
                  <h2 className="text-lg font-semibold">{course.name}</h2>
                  <p className="text-sm text-gray-500">{course.location}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm">{formatDateToLocal(course.date[0])}</p>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(course.price)}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateCourses id={course.id} />
                    <DeleteCourses id={course.id} />
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
                <th className="px-3 py-5 font-medium">Professor</th>
                <th className="px-3 py-5 font-medium">First Date</th>
                <th className="px-3 py-5 font-medium">Location</th>
                <th className="px-3 py-5 font-medium">Price</th>
                <th className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {courses?.map((course) => (
                <tr
                  key={course.id}
                  className="border-b text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {course.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {course.professor}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(course.date[0])}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {course.location}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(course.price)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCourses id={course.id} />
                      <DeleteCourses id={course.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
