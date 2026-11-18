'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { PageHeader } from '@/components/admin/PageHeader/PageHeader';
import { FormField } from '@/components/admin/FormField/FormField';
import { EVENT_IMAGES, ImageUpload } from '@/components/admin/ImageUpload/ImageUpload';
import { useEvents } from '@/contexts/admin/EventsProvider';

const MapView = dynamic(() => import('@/components/MapView/MapView').then((mod) => mod.MapView), {
  ssr: false,
});

const CATEGORIES = ['party', 'music', 'concert', 'rooftop', 'bar', 'popup'];

interface Point {
  latitude: number;
  longitude: number;
}

const formatDate = (value: string) =>
  new Date(`${value}T12:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const formatTime = (value: string) => {
  const [hours, minutes] = value.split(':').map(Number);
  const suffix = hours >= 12 ? 'pm' : 'am';
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${suffix}`;
};

const NewEventPage = () => {
  const router = useRouter();
  const { createEvent, creating } = useEvents();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [capacity, setCapacity] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState(EVENT_IMAGES[0]);
  const [point, setPoint] = useState<Point | null>(null);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !venueName.trim() || !address.trim() || !date || !startTime || !endTime) {
      setFormError('Fill in the name, venue, address, date and time');
      return;
    }
    if (!point) {
      setFormError('Tap the map to pick where the event happens');
      return;
    }
    const capacityValue = Number(capacity);
    if (!Number.isInteger(capacityValue) || capacityValue < 1) {
      setFormError('Capacity must be a whole number bigger than 0');
      return;
    }
    const priceValue = price ? Number(price) : 0;
    if (!Number.isFinite(priceValue) || priceValue < 0) {
      setFormError('Ticket price can not be negative');
      return;
    }

    setFormError('');
    const created = await createEvent({
      title: title.trim(),
      description: description.trim(),
      venueName: venueName.trim(),
      address: address.trim(),
      categories: [category],
      displayDate: formatDate(date),
      displayTime: `${formatTime(startTime)} - ${formatTime(endTime)}`,
      latitude: point.latitude,
      longitude: point.longitude,
      capacity: capacityValue,
      price: Math.round(priceValue),
      imageUrl,
    });

    if (created) router.push('/admin/events');
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

      <form className="form" onSubmit={handleSubmit} noValidate>
        {formError && (
          <p className="form-alert" role="alert">
            {formError}
          </p>
        )}

        <FormField label="Event Name">
          <input className="form-input" type="text" placeholder="Event name" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormField>

        <FormField label="Description">
          <textarea
            className="form-input"
            placeholder="Tell people what to expect"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>

        <div className="form-row">
          <FormField label="Date">
            <input className="form-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormField>
          <FormField label="Category">
            <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="form-row">
          <FormField label="Starts">
            <input className="form-input" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </FormField>
          <FormField label="Ends">
            <input className="form-input" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </FormField>
        </div>

        <div className="form-row">
          <FormField label="Venue">
            <input className="form-input" type="text" placeholder="Venue" value={venueName} onChange={(e) => setVenueName(e.target.value)} />
          </FormField>
          <FormField label="Address">
            <input className="form-input" type="text" placeholder="Cra 8 #22-26" value={address} onChange={(e) => setAddress(e.target.value)} />
          </FormField>
        </div>

        <div className="form-field">
          <span className="form-field__label">{point ? 'Location selected' : 'Tap the map to pick the location'}</span>
          <div className="pick-map">
            <MapView picked={point} onPick={setPoint} />
          </div>
        </div>

        <div className="form-row">
          <FormField label="Max Capacity">
            <input className="form-input" type="number" min="1" placeholder="150" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
          </FormField>
          <FormField label="Ticket Price (COP)">
            <input className="form-input" type="number" min="0" placeholder="30000" value={price} onChange={(e) => setPrice(e.target.value)} />
          </FormField>
        </div>

        <FormField label="Cover Image">
          <ImageUpload value={imageUrl} onChange={setImageUrl} />
        </FormField>

        <button type="submit" className="btn" disabled={creating}>
          {creating ? 'Creating...' : 'Create Event'}
        </button>
        <Link href="/admin/events" className="cancel-link">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default NewEventPage;
