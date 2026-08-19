import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.error = null;
    },
    clearCart(state) {
      state.items = [];
      state.error = null;
    },
    setCartLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setCartError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setCart, clearCart, setCartLoading, setCartError } = cartSlice.actions;
export default cartSlice.reducer;
