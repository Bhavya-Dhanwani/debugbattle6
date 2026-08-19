import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../state/store';
import { login, register, logout } from '../api/auth.api';
import { setCredentials, clearCredentials, setLoading, setError } from '../state/slices/auth.slice';
import type { LoginDTO } from '../api/generated/models/LoginDTO';
import type { RegisterDTO } from '../api/generated/models/RegisterDTO';
import { clearCart } from '../state/slices/cart.slice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (credentials: LoginDTO) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await login(credentials);
      const data = response.data;
      if (response.success && data) {
        dispatch(
          setCredentials({
            user: data.user as any,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        );
        return { success: true };
      } else {
        const msg = response.message || 'Login failed';
        dispatch(setError(msg));
        return { success: false, error: msg };
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Login failed';
      dispatch(setError(errMsg));
      return { success: false, error: errMsg };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRegister = async (details: RegisterDTO) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await register(details);
      const data = response.data;
      if (response.success && data) {
        dispatch(
          setCredentials({
            user: data.user as any,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        );
        return { success: true };
      } else {
        const msg = response.message || 'Registration failed';
        dispatch(setError(msg));
        return { success: false, error: msg };
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Registration failed';
      dispatch(setError(errMsg));
      return { success: false, error: errMsg };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken') || '';
    dispatch(setLoading(true));
    try {
      if (refreshToken) {
        await logout(refreshToken);
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      dispatch(clearCredentials());
      dispatch(clearCart());
      dispatch(setLoading(false));
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};
