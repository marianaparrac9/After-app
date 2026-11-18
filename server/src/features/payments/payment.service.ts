import Boom from "@hapi/boom";
import { getProductByIdService } from "../products/product.service";
import { createPaymentRepository, getPaymentByIdRepository, getPaymentsByUserRepository } from "./payment.repository";
import { Payment } from "./payment.types";

const getOwnedPayment = async (id: string, userId: string): Promise<Payment> => {
  const payment = await getPaymentByIdRepository(id, userId);

  if (!payment) {
    throw Boom.notFound("Payment not found");
  }

  return payment;
};

export const getPaymentsService = async (userId: string): Promise<Payment[]> => getPaymentsByUserRepository(userId);

export const getPaymentByIdService = async (id: string, userId: string): Promise<Payment> =>
  getOwnedPayment(id, userId);

export const createPaymentService = async (userId: string, productId: string): Promise<Payment> => {
  const product = await getProductByIdService(productId);
  const id = await createPaymentRepository({
    userId,
    productId: product.id,
    amount: product.price,
    currency: product.currency,
  });
  return getOwnedPayment(id, userId);
};
