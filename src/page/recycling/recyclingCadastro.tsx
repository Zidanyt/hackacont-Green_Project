import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import style from './recycling.module.css';

const API_URL = 'https://meruem.vercel.app/register-user';

function RecyclingCadastro() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log('Dados enviados com sucesso:', response.data);
      window.location.href = '/login-reciclador';
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao realizar o cadastro. Tente novamente.');
    }
  };

  return (
    <div className={style.container}>
      <div className={style.container_1}>
        <Box
          className={style.box}
          sx={{
            maxWidth: 500,
            margin: '0px auto',
            padding: '20px',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" component="h1" sx={{ mb: 3, textAlign: 'center' }}>
            Cadastro de Reciclador ou Ponto Verde
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Gmail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Senha"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Button
              className={style.botton}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Entrar
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
}

export default RecyclingCadastro;
