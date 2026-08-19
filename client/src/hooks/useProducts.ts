import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { getProducts, getProductById } from '../api/product.api';
import {
  setProducts,
  setSelectedCategory,
  setSearchQuery,
  setSelectedProduct,
  setProductLoading,
  setProductError,
} from '../state/slices/product.slice';

export const useProducts = () => {
  const dispatch = useDispatch();
  const {
    products,
    categories,
    selectedCategory,
    searchQuery,
    selectedProduct,
    loading,
    error,
  } = useSelector((state: RootState) => state.product);

  const fetchProducts = async (category?: string, search?: string) => {
    dispatch(setProductLoading(true));
    dispatch(setProductError(null));
    try {
      // If "ALL" category is selected, do not pass it to backend filter
      const catFilter = category === 'ALL' ? undefined : category;
      const response = await getProducts(catFilter, search);
      if (response.success && response.data) {
        dispatch(setProducts(response.data.products as any));
      } else {
        dispatch(setProductError(response.message || 'Failed to fetch products'));
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to fetch products';
      dispatch(setProductError(errMsg));
    } finally {
      dispatch(setProductLoading(false));
    }
  };

  const fetchProductById = async (id: string) => {
    dispatch(setProductLoading(true));
    dispatch(setProductError(null));
    dispatch(setSelectedProduct(null));
    try {
      const response = await getProductById(id);
      if (response.success && response.data) {
        dispatch(setSelectedProduct(response.data.product as any));
      } else {
        dispatch(setProductError(response.message || 'Failed to fetch product details'));
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to fetch product details';
      dispatch(setProductError(errMsg));
    } finally {
      dispatch(setProductLoading(false));
    }
  };

  const changeCategory = (category: string) => {
    dispatch(setSelectedCategory(category));
    fetchProducts(category, searchQuery);
  };

  const changeSearchQuery = (query: string) => {
    dispatch(setSearchQuery(query));
    fetchProducts(selectedCategory, query);
  };

  return {
    products,
    categories,
    selectedCategory,
    searchQuery,
    selectedProduct,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    changeCategory,
    changeSearchQuery,
  };
};
