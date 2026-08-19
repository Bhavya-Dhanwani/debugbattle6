import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartProduct {
  _id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
  category?: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state: CartState, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.error = null;
    },
    clearCart(state: CartState) {
      state.items = [];
      state.error = null;
    },
    setCartLoading(state: CartState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setCartError(state: CartState, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setCart, clearCart, setCartLoading, setCartError } = cartSlice.actions;
export default cartSlice.reducer;
