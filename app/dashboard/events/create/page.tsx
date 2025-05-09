import Form from '@/app/ui/events/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Events', href: '/dashboard/events' },
          {
            label: 'Create Event',
            href: '/dashboard/events/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}