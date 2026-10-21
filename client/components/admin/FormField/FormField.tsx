import type { ReactNode } from 'react';

export const FormField = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <label className="form-field">
      <span className="form-field__label">{label}</span>
      {children}
    </label>
  );
};
