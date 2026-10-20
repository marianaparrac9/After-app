import { findAllProducts, findProductById } from "./product.repository";
import { Product } from "./product.types";

export const getProductsService = (): Product[] => findAllProducts();

export const getProductByIdService = (id: string): Product => findProductById(id);
