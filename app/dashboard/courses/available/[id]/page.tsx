import Form from '@/app/ui/events/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchEventById, fetchEvents } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [course, customers] = await Promise.all([
        fetchEventById(id),
        fetchEvents(),
      ]);

      if (!course) {
        notFound();
      }

     return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cursos', href: '/dashboard/courses/available' },
          {
            label: 'Inscreva-se no Evento',
            href: `/dashboard/courses/available/${id}`,
            active: true,
          },
        ]}
      />
      <Form event={course} />
    </main>
  );
}