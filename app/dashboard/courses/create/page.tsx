import Form from '@/app/ui/cources/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Courses', href: '/dashboard/courses' },
          {
            label: 'Create Course',
            href: '/dashboard/courses/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}