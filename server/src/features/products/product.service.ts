import Boom from "@hapi/boom";
import { getProductByIdRepository, getProductsRepository } from "./product.repository";
import { Product } from "./product.types";

export const getProductsService = async (): Promise<Product[]> => getProductsRepository();

export const getProductByIdService = async (id: string): Promise<Product> => {
  const product = await getProductByIdRepository(id);

  if (!product) {
    throw Boom.notFound("Product not found");
  }

  return product;
};
