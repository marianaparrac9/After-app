import Boom from "@hapi/boom";
import { productsMock } from "./data.mock";
import { Product } from "./product.types";

export const findAllProducts = (): Product[] => productsMock;

export const findProductById = (id: string): Product => {
  const product = productsMock.find((item) => item.id === id);
  if (!product) {
    throw Boom.notFound("Product not found");
  }
  return product;
};
