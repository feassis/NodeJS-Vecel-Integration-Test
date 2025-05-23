// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type EventField = {
  id: string;
  name: string;
  date: string;
  location: string;
  rules: string;
  price: number;
  patreon_banner: string;
  rehearsal_dates: string[];
  costumers_id_paid: string[];
  costumers_id_subscribed : string[];
};

export type CoursesField = {
  id: string;
  name: string;
  professor: string
  date: string[];
  location: string;
  rules: string;
  price: number;
  costumers_id_paid: string[];
  costumers_id_subscribed : string[];
};

export type Participant = {
  name: string;
  plate_name: string;
  rg: string;
};

export type CostumerField = {
  cpf: string;
  name: string;
  surname: string;
  plate_name: string;
  mothers_name: string;
  date_of_birth: string;
  status_cpf: string;
  obs_cpf: string;
  rg: string;
  electors_title: string
  passport: string
  city: string
  state: string;
  country: string
  phone_number: string
  cellphone_number: string
  email: string  
  groups: string[]
  coreographies: string[]
  groups_k_pop: string[]
  coreographies_k_pop: string[]
  more_dances: string[]
  events: string[]
  cources: string[]
  participants: Participant[];
}

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerFieldInvoice = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
