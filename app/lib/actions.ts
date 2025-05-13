'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { Console } from 'console';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const EventFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Please enter a name.' }),
  date: z.string().min(1, { message: 'Please enter a date.' }),
  location: z.string().min(1, { message: 'Please enter a location.' }),
  rules: z.string().min(1, { message: 'Please provide the rules.' }),
  price: z.coerce
    .number()
    .nonnegative({ message: 'Price cannot be negative.' }),
  patreonBanner: z.string().url({ message: 'Please enter a valid URL.' }),
  rehearsalDates: z
    .array(z.string().min(1, { message: 'Date cannot be empty.' }))
    .min(1, { message: 'Please provide at least one rehearsal date.' }),
});

const CourseFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'Please enter a name.' }),
  professor: z.string().min(1, { message: 'Please enter a professor name.' }),
  date: z
    .array(z.string().min(1, { message: 'Date cannot be empty.' }))
    .min(1, { message: 'Please provide at least one course date.' }),
  location: z.string().min(1, { message: 'Please enter a location.' }),
  rules: z.string().min(1, { message: 'Please provide the rules.' }),
  price: z.coerce
    .number()
    .nonnegative({ message: 'Price cannot be negative.' }),
  costumers_id_paid: z.array(z.string()).optional(),
  costumers_id_subscribed: z.array(z.string()).optional(),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type EventState = {
  errors?: {
    name?: string[];
    date?: string[];
    location?: string[];
    rules?: string[];
    price?: string[];
    patreonBanner?: string[];
    rehearsalDates?: string[];
  };
  message?: string | null;
};

export type CourseState = {
  errors?: {
    name?: string[];
    professor?: string[];
    date?: string[];
    location?: string[];
    rules?: string[];
    price?: string[];
  };
  message?: string | null;
};
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
const CreateEvent = EventFormSchema.omit({id: true});
const UpdateEvent = EventFormSchema.omit({id: true});
const CreateCourse = CourseFormSchema;
const UpdateCourse = CourseFormSchema;

export async function createEvent(prevState: EventState, formData: FormData)
{

  console.log("try to create event")
  const validatedEventFields = CreateEvent.safeParse(
    {
      name: formData.get('name'),
      date: formData.get('date'),
      location: formData.get('location'),
      rules: formData.get('rules'),
      price: formData.get('price'),
      patreonBanner: formData.get('patreonBanner'),
      rehearsalDates: formData.getAll('rehearsalDates')
    }
  )


  if (!validatedEventFields.success) {
    return {
      errors: validatedEventFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Event.',
    };
  }

  const {name, date, location, rules, price, patreonBanner, rehearsalDates} = validatedEventFields.data;

  const costumersIdPaid : string[] = []
  const costumersIdSubscribed : string[] = []

  const rehearsalDatesProcessed =
  rehearsalDates.length === 1 && typeof rehearsalDates[0] === 'string'
    ? rehearsalDates[0].split(',').map((d) => d.trim())
    : rehearsalDates;

  const priceInCents = price * 100;

  try {
    await sql`
      INSERT INTO events (
        name, 
        date, 
        location, 
        rules, 
        price, 
        patreon_banner,
        rehearsal_dates,
        costumers_id_paid,
        costumers_id_subscribed 
      )
      VALUES (
        ${name}, 
        ${date}, 
        ${location}, 
        ${rules}, 
        ${priceInCents}, 
        ${patreonBanner}, 
        ${rehearsalDatesProcessed as string[]}::text[],
        ${sql.array(costumersIdPaid as string[])}::text[],
        ${sql.array(costumersIdSubscribed as string[])}::text[]
      )
    `;
  } catch (error) {
    console.error(error);
  }

  console.log(formData.getAll('sent?'));

  revalidatePath('/dashboard/events');
  redirect('/dashboard/events');
}

export async function createCourse(prevState: CourseState, formData: FormData) {
  console.log("Try to create course");

  console.log( formData.getAll('date'));

  const validatedCourseFields = CreateCourse.safeParse({
    name: formData.get('name'),
    professor: formData.get('professor'),
    date: formData.getAll('date'), // expecting multiple dates
    location: formData.get('location'),
    rules: formData.get('rules'),
    price: formData.get('price'),
  });

  
  if (!validatedCourseFields.success) {
    console.log(validatedCourseFields.error.flatten().fieldErrors);
    return {
      errors: validatedCourseFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create course.',
    };
  }

  console.log("is valid");

  const {
    name,
    professor,
    date,
    location,
    rules,
    price,
  } = validatedCourseFields.data;
  console.log("data cons created");  
  const costumersIdPaid: string[] = [];
  const costumersIdSubscribed: string[] = [];

  const dateProcessed =
    date.length === 1 && typeof date[0] === 'string'
      ? date[0].split(',').map((d) => d.trim())
      : date;

  const priceInCents = price * 100;

  console.log("data processed");

  try {
    await sql`
      INSERT INTO courses (
        name,
        professor,
        date,
        location,
        rules,
        price,
        costumers_id_paid,
        costumers_id_subscribed
      )
      VALUES (
        ${name},
        ${professor},
        ${dateProcessed as string[]}::text[],
        ${location},
        ${rules},
        ${priceInCents},
        ${sql.array(costumersIdPaid)}::text[],
        ${sql.array(costumersIdSubscribed)}::text[]
      )
    `;
  } catch (error) {
    console.error('Error inserting course:', error);
    return {
      message: 'Database error. Failed to create course.',
    };
  }
   console.log("course created?");
  revalidatePath('/dashboard/courses');
  redirect('/dashboard/courses');
}

export async function updateEvent(
  id: string,
  prevState: EventState,
  formData: FormData,
) {
  const validatedFields = UpdateEvent.safeParse({
    name: formData.get('name'),
    date: formData.get('date'),
    location: formData.get('location'),
    rules: formData.get('rules'),
    price: formData.get('price'),
    patreonBanner: formData.get('patreonBanner'),
    rehearsalDates: formData.getAll('rehearsal_dates')
  });

  console.log(formData.getAll('rehearsal_dates'));


  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Event.',
    };
  }

  const {
    name,
    date,
    location,
    rules,
    price,
    patreonBanner,
    rehearsalDates,
  } = validatedFields.data;

  const rehearsalDatesProcessed = rehearsalDates.length === 1 && typeof rehearsalDates[0] === 'string'
  ? rehearsalDates[0].split(',')  : rehearsalDates;

  const priceInCents = price * 100;
  console.log(priceInCents)

  try {
    await sql`
      UPDATE events
      SET 
        name = ${name},
        date = ${date},
        location = ${location},
        rules = ${rules},
        price = ${priceInCents},
        patreon_banner = ${patreonBanner},
        rehearsal_dates = ${rehearsalDatesProcessed as string[]}::text[]
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Update Event.' };
  }

  console.log("Update Event")

  revalidatePath('/dashboard/events');
  redirect('/dashboard/events');
}

export async function updateCourse(
  id: string,
  prevState: CourseState,
  formData: FormData,
) {
  const validatedFields = UpdateCourse.safeParse({
    name: formData.get('name'),
    professor: formData.get('professor'),
    location: formData.get('location'),
    rules: formData.get('rules'),
    price: formData.get('price'),
    date: formData.getAll('date'),
  });

  console.log(formData.getAll('dates'));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Course.',
    };
  }

  const {
    name,
    professor,
    location,
    rules,
    price,
    date,
  } = validatedFields.data;

  const datesProcessed = date.length === 1 && typeof date[0] === 'string'
    ? date[0].split(',')
    : date;

  const priceInCents = price * 100;

  try {
    await sql`
      UPDATE courses
      SET 
        name = ${name},
        professor = ${professor},
        location = ${location},
        rules = ${rules},
        price = ${priceInCents},
        dates = ${sql.array(datesProcessed as string[])}::text[]
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Update Course.' };
  }

  console.log("Update Course");

  revalidatePath('/dashboard/courses');
  redirect('/dashboard/courses');
}

export async function deleteEvent(id: string) {
  await sql`DELETE FROM events WHERE id = ${id}`;
  revalidatePath('/dashboard/events');
}

export async function deleteCourse(id: string) {
  await sql`DELETE FROM courses WHERE id = ${id}`;
  revalidatePath('/dashboard/courses');
}

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
 
    try {
        await sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
      } catch (error) {
        // We'll log the error to the console for now
        console.error(error);
      }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData,
  ) {
    const validatedFields = UpdateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Invoice.',
      };
    }
   
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
   
    try {
      await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
    } catch (error) {
      return { message: 'Database Error: Failed to Update Invoice.' };
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  export async function deleteInvoice(id: string) { 
    // Unreachable code block
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  }

  export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        return error.message
      }
      throw error;
    }
  }