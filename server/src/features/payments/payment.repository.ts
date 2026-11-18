import { pool } from "../../db/db";
import { CreatePaymentDTO, Payment } from "./payment.types";

const PAYMENT_SELECT = `
  SELECT
    pay.id,
    pay.user_id AS "userId",
    pay.amount,
    pay.currency,
    pay.status,
    pay.created_at AS "createdAt",
    json_build_object(
      'id', pr.id,
      'name', pr.name,
      'eventId', pr.event_id,
      'imageUrl', pr.image_url
    ) AS product
  FROM public.payments pay
  JOIN public.products pr ON pr.id = pay.product_id
`;

export const getPaymentsByUserRepository = async (userId: string): Promise<Payment[]> => {
  const result = await pool.query<Payment>(`${PAYMENT_SELECT} WHERE pay.user_id = $1 ORDER BY pay.created_at DESC`, [
    userId,
  ]);
  return result.rows;
};

export const getPaymentByIdRepository = async (id: string, userId: string): Promise<Payment | undefined> => {
  const result = await pool.query<Payment>(`${PAYMENT_SELECT} WHERE pay.id = $1 AND pay.user_id = $2`, [id, userId]);
  return result.rows[0];
};

export const createPaymentRepository = async (payment: CreatePaymentDTO): Promise<string> => {
  const result = await pool.query<{ id: string }>(
    `INSERT INTO public.payments (user_id, product_id, amount, currency, status)
     VALUES ($1, $2, $3, $4, 'paid')
     RETURNING id`,
    [payment.userId, payment.productId, payment.amount, payment.currency]
  );
  return result.rows[0].id;
};
