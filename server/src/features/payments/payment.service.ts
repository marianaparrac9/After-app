import { findAllPayments, findPaymentById } from "./payment.repository";
import { Payment } from "./payment.types";

export const getPaymentsService = (): Payment[] => findAllPayments();

export const getPaymentByIdService = (id: string): Payment => findPaymentById(id);
