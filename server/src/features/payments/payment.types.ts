export type PaymentStatus = "paid" | "pending" | "failed";

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: string;
  product: {
    id: string;
    name: string;
    eventId: string | null;
    imageUrl: string;
  };
}

export interface CreatePaymentDTO {
  userId: string;
  productId: string;
  amount: number;
  currency: string;
}
