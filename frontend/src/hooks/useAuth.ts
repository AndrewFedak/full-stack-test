import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authAPI, LoginData, RegisterData } from '../services/api';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginData) => authAPI.login(data),
    onSuccess: (response) => {
      const { token } = response.data;
      localStorage.setItem('token', token);

      navigate('/');
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => authAPI.register(data),
  });
};
