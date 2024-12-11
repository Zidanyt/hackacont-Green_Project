import axiosInstance from './axiosInstance';
import axios from 'axios';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  repetirSenha: string;
  cnpj: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axiosInstance.post('/register', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      throw new Error('Ocorreu um erro inesperado.');
    }
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axiosInstance.post('/login', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      throw new Error('Ocorreu um erro inesperado.');
    }
  }
};
