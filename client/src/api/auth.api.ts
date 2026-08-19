import { UsersService } from './generated/services/UsersService';
import type { LoginDTO } from './generated/models/LoginDTO';
import type { RegisterDTO } from './generated/models/RegisterDTO';

export const login = (credentials: LoginDTO) => {
  return UsersService.login(credentials);
};

export const register = (details: RegisterDTO) => {
  return UsersService.register(details);
};

export const logout = (refreshToken: string) => {
  return UsersService.logout({ refreshToken });
};
