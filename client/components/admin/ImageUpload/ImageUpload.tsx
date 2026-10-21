'use client';

import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Icon } from '../Icon/Icon';

export const ImageUpload = () => {
  const [fileName, setFileName] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : '');
  };

  return (
    <label className="upload">
      <input type="file" accept="image/*" hidden onChange={handleChange} />
      <span className="upload__text">{fileName || 'Choose an image'}</span>
      <Icon name="refresh" size={18} />
    </label>
  );
};
