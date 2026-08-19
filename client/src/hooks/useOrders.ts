import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../state/store';
import { placeOrder, getOrderHistory } from '../api/order.api';

export const useOrders = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getOrderHistory();
      if (response.success && response.data) {
        setOrders(response.data);
      } else {
        setError(response.message || 'Failed to fetch order history');
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to fetch order history';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async () => {
    if (!isAuthenticated) return { success: false, error: 'Not authenticated' };
    setLoading(true);
    setError(null);
    try {
      const response = await placeOrder();
      if (response.success && response.data) {
        return { success: true, order: response.data };
      } else {
        const msg = response.message || 'Failed to place order';
        setError(msg);
        return { success: false, error: msg };
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to place order';
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
  };
};
