'use client';

import { Icon } from '../Icon/Icon';

export const EVENT_IMAGES = [
  '/images/events/techno-night.jpg',
  '/images/events/rooftop-sessions.jpg',
  '/images/events/jazz-night.jpg',
  '/images/events/indie-vibes.jpg',
  '/images/events/night-talks.jpg',
];

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const index = Math.max(EVENT_IMAGES.indexOf(value), 0);
  const name = value.split('/').pop()?.replace(/\.[a-z]+$/, '').replace(/-/g, ' ') || 'Choose an image';

  return (
    <button
      type="button"
      className="upload"
      onClick={() => onChange(EVENT_IMAGES[(index + 1) % EVENT_IMAGES.length])}
    >
      <span className="upload__text">{name}</span>
      <Icon name="refresh" size={18} />
    </button>
  );
};
