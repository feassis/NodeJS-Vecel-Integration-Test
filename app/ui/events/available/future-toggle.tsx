'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function FutureEventsToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showFuture = searchParams.get('future') === 'true';

  function handleToggle(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.checked) {
      params.set('future', 'true');
    } else {
      params.delete('future');
    }
    router.push(`/dashboard/events/available?${params.toString()}`);
  }

  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={showFuture}
        onChange={handleToggle}
        className="accent-blue-600"
      />
      Show future events only
    </label>
  );
}
