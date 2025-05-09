import Form from '@/app/ui/events/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchEventById, fetchEvents } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [invoice, customers] = await Promise.all([
        fetchEventById(id),
        fetchEvents(),
      ]);

      if (!invoice) {
        notFound();
      }

     return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Events', href: '/dashboard/events' },
          {
            label: 'Edit Event',
            href: `/dashboard/events/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form event={invoice} />
    </main>
  );
}