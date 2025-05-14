'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { EventField } from '@/app/lib/definitions';
import { processEventSubscription, ConsumerStateForEvents } from '@/app/lib/actions';
import ParticipantsField from './participant-field';

export default function CostumerForm({ event: event }: { event: EventField }) {
  const initialState: ConsumerStateForEvents = { message: null, errors: {} };
  const [state, formAction] = useActionState(processEventSubscription, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* CPF */}
        <div className="mb-4">
          <label htmlFor="cpf" className="mb-2 block text-sm font-medium">
            CPF
          </label>
          <input
            id="cpf"
            name="cpf"
            type="text"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>

        <div className="mb-4 flex gap-4">
  {/* Name */}
  <div className="flex-1">
    <label htmlFor="name" className="mb-2 block text-sm font-medium">
      Name
    </label>
    <input
      id="name"
      name="name"
      type="text"
      className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
    />
  </div>

  {/* Surname */}
  <div className="flex-1">
    <label htmlFor="surname" className="mb-2 block text-sm font-medium">
      Surname
    </label>
    <input
      id="surname"
      name="surname"
      type="text"
      className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
    />
  </div>

  {/* Plate Name */}
  <div className="flex-1">
    <label htmlFor="plate_name" className="mb-2 block text-sm font-medium">
      Plate Name
    </label>
    <input
      id="plate_name"
      name="plate_name"
      type="text"
      className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
    />
  </div>
</div>

        
        <div className="mb-4 flex gap-4">
  {/* RG */}
  <div className="flex-1">
    <label htmlFor="rg" className="mb-2 block text-sm font-medium">
      RG
    </label>
    <input
      id="rg"
      name="rg"
      type="text"
      className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
    />
  </div>

  {/* Date of Birth */}
  <div className="flex-1">
    <label htmlFor="date_of_birth" className="mb-2 block text-sm font-medium">
      Date of Birth
    </label>
    <input
      id="date_of_birth"
      name="date_of_birth"
      type="date"
      className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
    />
  </div>
</div>

        {/* Mother's Name */}
        <div className="mb-4">
          <label htmlFor="mothers_name" className="mb-2 block text-sm font-medium">
            Mother's Name
          </label>
          <input
            id="mothers_name"
            name="mothers_name"
            type="text"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>
        

        {/* Electors Title */}
        <div className="mb-4">
          <label htmlFor="electors_title" className="mb-2 block text-sm font-medium">
            Elector's Title
          </label>
          <input
            id="electors_title"
            name="electors_title"
            type="text"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>

        {/* Passport */}
        <div className="mb-4">
          <label htmlFor="passport" className="mb-2 block text-sm font-medium">
            Passport
          </label>
          <input
            id="passport"
            name="passport"
            type="text"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>

        <div className="mb-4 flex gap-4">
  {/* City */}
  <div className="flex-1">
    <label htmlFor="city" className="mb-2 block text-sm font-medium">
      City
    </label>
    <input
      id="city"
      name="city"
      type="text"
      className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
    />
  </div>

  {/* State */}
  <div className="flex-1">
    <label htmlFor="state" className="mb-2 block text-sm font-medium">
      State
    </label>
    <input
      id="state"
      name="state"
      type="text"
      className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
    />
  </div>

  {/* Country */}
  <div className="flex-1">
    <label htmlFor="country" className="mb-2 block text-sm font-medium">
      Country
    </label>
    <input
      id="country"
      name="country"
      type="text"
      className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
    />
  </div>
</div>

        <div className="mb-4 flex gap-4">
  {/* Phone Number */}
  <div className="flex-1">
    <label htmlFor="phone_number" className="mb-2 block text-sm font-medium">
      Phone Number
    </label>
    <input
      id="phone_number"
      name="phone_number"
      type="tel"
      className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
    />
  </div>

  {/* Cellphone Number */}
  <div className="flex-1">
    <label htmlFor="cellphone_number" className="mb-2 block text-sm font-medium">
      Cellphone Number
    </label>
    <input
      id="cellphone_number"
      name="cellphone_number"
      type="tel"
      className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
    />
  </div>
</div>


        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>

        {/* Participants */}
        <ParticipantsField></ParticipantsField>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/costumers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Inscrever-se</Button>
      </div>
    </form>
  );
}
