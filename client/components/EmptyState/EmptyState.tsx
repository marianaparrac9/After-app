"use client";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState = ({ title, subtitle, actionText, onAction }: EmptyStateProps) => {
  return (
    <div className="empty">
      <p>
        <strong>{title}</strong>
      </p>
      {subtitle ? <p className="muted">{subtitle}</p> : null}
      {actionText && onAction ? (
        <button className="btn small" type="button" onClick={onAction}>
          {actionText}
        </button>
      ) : null}
    </div>
  );
};
