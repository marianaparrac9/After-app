import Boom from "@hapi/boom";
import { paymentsMock } from "./data.mock";
import { Payment } from "./payment.types";

export const findAllPayments = (): Payment[] => paymentsMock;

export const findPaymentById = (id: string): Payment => {
  const payment = paymentsMock.find((item) => item.id === id);
  if (!payment) {
    throw Boom.notFound("Payment not found");
  }
  return payment;
};
