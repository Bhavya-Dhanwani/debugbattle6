import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../state/store';
import { getCart, addItemToCart, updateCartItem, removeItemFromCart } from '../api/cart.api';
import { setCart, clearCart, setCartLoading, setCartError } from '../state/slices/cart.slice';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    dispatch(setCartLoading(true));
    dispatch(setCartError(null));
    try {
      const response = await getCart();
      if (response.success && response.data) {
        dispatch(setCart((response.data.items || []) as any));
      } else {
        dispatch(setCartError(response.message || 'Failed to fetch cart'));
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to fetch cart';
      dispatch(setCartError(errMsg));
    } finally {
      dispatch(setCartLoading(false));
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!isAuthenticated) {
      return { success: false, error: 'Please login to add items to cart' };
    }
    dispatch(setCartLoading(true));
    dispatch(setCartError(null));
    try {
      const response = await addItemToCart(productId, quantity);
      if (response.success && response.data) {
        dispatch(setCart((response.data.items || []) as any));
        return { success: true };
      } else {
        const msg = response.message || 'Failed to add item to cart';
        dispatch(setCartError(msg));
        return { success: false, error: msg };
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to add item to cart';
      dispatch(setCartError(errMsg));
      return { success: false, error: errMsg };
    } finally {
      dispatch(setCartLoading(false));
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!isAuthenticated) return { success: false, error: 'Not authenticated' };
    if (quantity < 1) {
      return removeItem(productId);
    }
    dispatch(setCartLoading(true));
    dispatch(setCartError(null));
    try {
      const response = await updateCartItem(productId, quantity);
      if (response.success && response.data) {
        dispatch(setCart((response.data.items || []) as any));
        return { success: true };
      } else {
        const msg = response.message || 'Failed to update quantity';
        dispatch(setCartError(msg));
        return { success: false, error: msg };
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to update quantity';
      dispatch(setCartError(errMsg));
      return { success: false, error: errMsg };
    } finally {
      dispatch(setCartLoading(false));
    }
  };

  const removeItem = async (productId: string) => {
    if (!isAuthenticated) return { success: false, error: 'Not authenticated' };
    dispatch(setCartLoading(true));
    dispatch(setCartError(null));
    try {
      const response = await removeItemFromCart(productId);
      if (response.success && response.data) {
        dispatch(setCart((response.data.items || []) as any));
        return { success: true };
      } else {
        const msg = response.message || 'Failed to remove item';
        dispatch(setCartError(msg));
        return { success: false, error: msg };
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to remove item';
      dispatch(setCartError(errMsg));
      return { success: false, error: errMsg };
    } finally {
      dispatch(setCartLoading(false));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const subtotal = items.reduce((acc: number, item: any) => {
    const price = item.product?.price || 0;
    return acc + price * item.quantity;
  }, 0);

  const itemCount = items.reduce((acc: number, item: any) => acc + item.quantity, 0);

  return {
    items,
    loading,
    error,
    subtotal,
    itemCount,
    fetchCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart: handleClearCart,
  };
};
