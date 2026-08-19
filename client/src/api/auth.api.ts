import { UsersService } from './generated/services/UsersService';
import type { LoginDTO } from './generated/models/LoginDTO';
import type { RegisterDTO } from './generated/models/RegisterDTO';

export const login = (credentials: LoginDTO) => {
  return UsersService.loginUser(credentials);
};

export const register = (details: RegisterDTO) => {
  return UsersService.registerUser(details);
};

export const logout = (refreshToken: string) => {
  return UsersService.logoutUser({ refreshToken });
};
