import Link from 'next/link';

export const CreateEventButton = () => {
  return (
    <Link href="/admin/events/new" className="create-btn">
      + Create Event
    </Link>
  );
};
