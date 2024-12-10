import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import style from './cadastroGerente.module.css';


const API_URL = 'http://localhost:3000/usuarios';

const registerUser = async (data: any) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

function CadastroGerente() {
  const [formData, setFormData] = useState({
    nome: '',
    gmail: '',
    senha: '',
    repetirSenha: '',
    cnpj: '',
    localizacao: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepetirPassword, setShowRepetirPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Obter localização do usuário
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

    if (formData.senha !== formData.repetirSenha) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    
    const userData = {
      nome: formData.nome,
      email: formData.gmail,
      senha: formData.senha,
      cnpj: formData.cnpj,
      localizacao: formData.localizacao,
    };

    try {
      const response = await registerUser(userData);
      console.log('Cadastro realizado com sucesso:', response);
      alert('Usuário cadastrado com sucesso!');
      navigate('/login'); // Redirecionar para a página de login
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);
      setErrorMessage(error.response?.data?.message || 'Erro ao realizar cadastro.');
    }
  };

 
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleRepetirPasswordVisibility = () =>
    setShowRepetirPassword((prev) => !prev);

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
            Cadastro de Usuário
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
              type={showPassword ? 'text' : 'password'}
              value={formData.senha}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Repetir Senha"
              name="repetirSenha"
              type={showRepetirPassword ? 'text' : 'password'}
              value={formData.repetirSenha}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleRepetirPasswordVisibility} edge="end">
                      {showRepetirPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="CNPJ"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Localização"
              name="localizacao"
              value={formData.localizacao}
              disabled
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
