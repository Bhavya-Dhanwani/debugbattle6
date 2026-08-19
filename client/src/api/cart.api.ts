import { CartService } from './generated/services/CartService';

export const getCart = () => {
  return CartService.getCart();
};

export const addItemToCart = (productId: string, quantity: number) => {
  return CartService.addItemToCart({ productId, quantity });
};

export const updateCartItem = (productId: string, quantity: number) => {
  return CartService.updateCartItem({ productId, quantity });
};

export const removeItemFromCart = (productId: string) => {
  return CartService.removeItemFromCart(productId);
};
