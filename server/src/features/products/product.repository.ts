import { pool } from "../../db/db";
import { Product } from "./product.types";

const PRODUCT_COLUMNS =
  'id, event_id AS "eventId", name, category, price, currency, description, image_url AS "imageUrl", place';

export const getProductsRepository = async (): Promise<Product[]> => {
  const result = await pool.query<Product>(`SELECT ${PRODUCT_COLUMNS} FROM public.products ORDER BY name ASC`);
  return result.rows;
};

export const getProductByIdRepository = async (id: string): Promise<Product | undefined> => {
  const result = await pool.query<Product>(`SELECT ${PRODUCT_COLUMNS} FROM public.products WHERE id = $1`, [id]);
  return result.rows[0];
};
