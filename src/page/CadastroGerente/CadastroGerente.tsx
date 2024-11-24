import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/authService';
import style from './cadastroGerente.module.css';

function CadastroGerente() {
  const [formData, setFormData] = useState({
    nome: '',
    gmail: '',
    senha: '',
    repetirSenha: '',
    cnpj: '',
    localizacao: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prevData) => ({
            ...prevData,
            localizacao: `Lat: ${latitude}, Lon: ${longitude}`,
          }));
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          setErrorMessage('Não foi possível obter a localização.');
        }
      );
    } else {
      setErrorMessage('Geolocalização não suportada no seu navegador.');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados para enviar:', formData);
    try {
      const response = await registerUser(formData);
      console.log('Cadastro realizado com sucesso:', response);
      navigate('/login');
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);
      setErrorMessage(error.message || 'Erro ao realizar cadastro.');
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
            Cadastro de Gerente
          </Typography>
          {errorMessage && (
            <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
              {errorMessage}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Gmail"
              name="gmail"
              type="email"
              value={formData.gmail}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Repetir Senha"
              name="repetirSenha"
              type="password"
              value={formData.repetirSenha}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="CNPJ"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Button className={style.botton} type="submit" variant="contained" color="primary" fullWidth>
              Cadastrar
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
}

export default CadastroGerente;
