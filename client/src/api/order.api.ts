import { OrdersService } from './generated/services/OrdersService';

export const placeOrder = () => {
  return OrdersService.placeOrder();
};

export const getOrderHistory = () => {
  return OrdersService.getOrderHistory();
};
