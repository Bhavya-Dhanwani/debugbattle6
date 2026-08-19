import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductState {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  categories: ['ALL', 'SNEAKERS', 'CLOTHING', 'ACCESSORIES', 'WATCHES', 'BAGS', 'SALE'],
  selectedCategory: 'ALL',
  searchQuery: '',
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state: ProductState, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.error = null;
    },
    setSelectedCategory(state: ProductState, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    setSearchQuery(state: ProductState, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedProduct(state: ProductState, action: PayloadAction<Product | null>) {
      state.selectedProduct = action.payload;
    },
    setProductLoading(state: ProductState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setProductError(state: ProductState, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  setSelectedCategory,
  setSearchQuery,
  setSelectedProduct,
  setProductLoading,
  setProductError,
} = productSlice.actions;
export default productSlice.reducer;
