export interface Payment {
  id: string;
  clientId: string;
  productId: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed";
  createdAt: string;
}
