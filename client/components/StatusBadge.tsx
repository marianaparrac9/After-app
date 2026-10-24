import { EventStatus } from "@/types/models";

const labels: Record<EventStatus, string> = {
  live: "LIVE",
  open: "OPEN",
  "almost-full": "ALMOST FULL",
  closed: "CLOSED",
};

export const StatusBadge = ({
  status,
  className = "",
}: {
  status: EventStatus;
  className?: string;
}) => {
  return (
    <span className={`badge ${status} ${className}`}>
      {status === "live" ? <span className="dot" /> : null}
      {labels[status]}
    </span>
  );
};
