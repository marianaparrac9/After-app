interface EmptyStateProps {
  title: string;
  subtitle?: string;
}

// Mensaje centrado para "cargando", "error" o "no hay datos"
export const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <p className="empty-state__title">{title}</p>
      {subtitle && <p className="empty-state__subtitle">{subtitle}</p>}
    </div>
  );
};
