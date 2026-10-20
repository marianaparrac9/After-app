import { Payment } from "./payment.types";

export const paymentsMock: Payment[] = [
  {
    id: "pay-1",
    clientId: "cli-1",
    productId: "prod-1",
    amount: 45000,
    currency: "COP",
    status: "paid",
    createdAt: "2026-03-10T21:00:00.000Z",
  },
  {
    id: "pay-2",
    clientId: "cli-1",
    productId: "prod-2",
    amount: 38000,
    currency: "COP",
    status: "paid",
    createdAt: "2026-03-12T20:15:00.000Z",
  },
  {
    id: "pay-3",
    clientId: "cli-2",
    productId: "prod-4",
    amount: 50000,
    currency: "COP",
    status: "pending",
    createdAt: "2026-03-15T18:40:00.000Z",
  },
];
