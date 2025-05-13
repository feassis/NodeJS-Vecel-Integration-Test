import Form from '@/app/ui/cources/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCourseById, fetchCourses } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [courses, customers] = await Promise.all([
        fetchCourseById(id),
       fetchCourses(),
      ]);

      if (!courses) {
        notFound();
      }

     return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cursos', href: '/dashboard/courses' },
          {
            label: 'Editar Cursos',
            href: `/dashboard/courses/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form course={courses} />
    </main>
  );
}