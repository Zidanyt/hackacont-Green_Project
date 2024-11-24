import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authService';
import { LoginData } from '../../interfaces/login.interface';

import style from './LoginGerente.module.css'


function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    gmail: '',
    senha: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(loginData);
      console.log('Login realizado com sucesso:', response);
      navigate('/mapa-reciclagem');
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage(error.message || 'Erro ao realizar login.');
    }
  };

  return (
    <div className={style.container}>
      <div className={style.container_1}>
        <Box
        className={style.box}
          sx={{
            maxWidth: 500,
            margin: '50px auto',
            padding: '20px',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" component="h1" sx={{ mb: 3, textAlign: 'center' }}>
            Login do Gerente
          </Typography>
          {errorMessage && (
            <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
              {errorMessage}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Gmail"
              name="gmail"
              value={loginData.gmail}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Senha"
              name="senha"
              type="password"
              value={loginData.senha}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Button className={style.botton} type="submit" variant="contained" color="primary" fullWidth>
              Entrar
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
}

export default Login;
