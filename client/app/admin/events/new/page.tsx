'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { PageHeader } from '@/components/admin/PageHeader/PageHeader';
import { FormField } from '@/components/admin/FormField/FormField';
import { ImageUpload } from '@/components/admin/ImageUpload/ImageUpload';
import { Icon } from '@/components/admin/Icon/Icon';

// El server solo tiene GET, así que este formulario es visual: al enviar vuelve a Events
const NewEventPage = () => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/admin/events');
  };

  return (
    <div className="page page--no-nav">
      <PageHeader
        title={
          <>
            Build
            <br />
            tonight&apos;s experience
          </>
        }
        backHref="/admin/events"
      />

      <form className="form" onSubmit={handleSubmit}>
        <FormField label="Event Name">
          <input className="form-input" type="text" placeholder="Event name" required />
        </FormField>

        <FormField label="Description">
          <textarea className="form-input" placeholder="Tell people what to expect" />
        </FormField>

        <div className="form-row">
          <FormField label="Date">
            <input className="form-input" type="date" required />
          </FormField>
          <FormField label="Time">
            <input className="form-input" type="time" required />
          </FormField>
        </div>

        <div className="form-row">
          <FormField label="Location">
            <input className="form-input" type="text" placeholder="Venue" required />
          </FormField>
          <Link href="/admin/map" className="map-button">
            <Icon name="pin" size={16} />
            Select on map
          </Link>
        </div>

        <FormField label="Max Capacity">
          <input className="form-input" type="number" min="1" placeholder="150" required />
        </FormField>

        <FormField label="Upload Image">
          <ImageUpload />
        </FormField>

        <button type="submit" className="btn">
          Create Event
        </button>
        <Link href="/admin/events" className="cancel-link">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default NewEventPage;
