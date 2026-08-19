import { ProductsService } from './generated/services/ProductsService';

export const getProducts = (category?: string, search?: string) => {
  return ProductsService.getAllProducts(category, search);
};

export const getProductById = (id: string) => {
  return ProductsService.getProductById(id);
};
