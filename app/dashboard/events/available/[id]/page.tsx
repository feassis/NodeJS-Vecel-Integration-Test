import Form from '@/app/ui/events/available/subscribe-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchEventById, fetchEvents } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import PublicEventCard from '@/app/ui/events/event-card';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [event, customers] = await Promise.all([
        fetchEventById(id),
        fetchEvents(),
      ]);

      if (!event) {
        notFound();
      }

     return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Eventos', href: '/dashboard/events/available' },
          {
            label: 'Inscreva-se no Evento',
            href: `/dashboard/events/available/${id}`,
            active: true,
          },
        ]}
      />
      <PublicEventCard event={event}/>
      <Form event={event} />
    </main>
  );
}