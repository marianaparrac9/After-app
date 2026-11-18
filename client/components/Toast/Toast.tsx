"use client";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toast: ToastItem;
  onClose: (id: number) => void;
}

export const Toast = ({ toast, onClose }: ToastProps) => {
  return (
    <div className={`toast toast-${toast.type}`} role={toast.type === "error" ? "alert" : "status"}>
      <span>{toast.message}</span>
      <button type="button" className="toast-close" onClick={() => onClose(toast.id)} aria-label="Close message">
        ×
      </button>
    </div>
  );
};
