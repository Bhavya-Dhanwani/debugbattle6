import { ProductsService } from './generated/services/ProductsService';
import type { CreateProductDTO } from './generated/models/CreateProductDTO';
import type { UpdateProductDTO } from './generated/models/UpdateProductDTO';

export const getProducts = (category?: string, search?: string) => {
  return ProductsService.getAllProducts(category, search);
};

export const getProductById = (id: string) => {
  return ProductsService.getProductById(id);
};

export const createProduct = (productData: CreateProductDTO) => {
  return ProductsService.createProduct(productData);
};

export const updateProduct = (id: string, productData: UpdateProductDTO) => {
  return ProductsService.updateProduct(id, productData);
};

export const deleteProduct = (id: string) => {
  return ProductsService.deleteProduct(id);
};
