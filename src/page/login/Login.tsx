import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginData } from '../../interfaces/login.interface';

function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    nome: '',
    senha: '',
    cnpj: '',
  });
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados de login enviados:', loginData);
    navigate('/mapa-reciclagem');
  };

  return (
    <Box
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
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nome"
          name="nome"
          value={loginData.nome}
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
        <TextField
          fullWidth
          label="CNPJ"
          name="cnpj"
          value={loginData.cnpj}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Entrar
        </Button>
      </form>
    </Box>
  );
}

export default Login;
