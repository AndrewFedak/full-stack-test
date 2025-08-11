import { useMutation } from '@tanstack/react-query';
import { authAPI, LoginData, RegisterData } from '../services/api';

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) => authAPI.login(data),
    onSuccess: (response) => {
      const { token } = response.data;
      localStorage.setItem('token', token);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => authAPI.register(data),
  });
};
