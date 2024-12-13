import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authService'; // Função de API para login
import { LoginData } from '../../interfaces/login.interface';
import style from './loginrec.module.css';

function LoginRecycling() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado de erro
  const navigate = useNavigate();

  // Função para identificar CNPJ (14 dígitos numéricos)
  const isCNPJ = (email: string) => {
    const cnpjRegex = /^\d{14}$/; // Exatamente 14 dígitos
    return cnpjRegex.test(email.replace(/\D/g, '')); // Remove caracteres não numéricos
  };

  // Captura mudanças nos campos de texto
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Submete o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Verificação para CNPJ
    if (isCNPJ(loginData.email)) {
      setErrorMessage('Você está na tela de login errada. Use o login de CNPJ.');
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser(loginData); // Chama a API de login
      console.log('Login realizado com sucesso:', response);
      navigate('/Local'); // Redireciona após sucesso
    } catch (error: any) {
      console.error('Erro ao realizar login:', error);
      setErrorMessage(error.message || 'Erro ao realizar login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
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
            Login do Reciclador
          </Typography>

          {errorMessage && (
            <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
              {errorMessage}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Gmail ou CNPJ"
              name="email"
              type="text"
              value={loginData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Senha"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <Button
              className={style.botton}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading} // Desativa o botão enquanto carrega
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
}

export default LoginRecycling;
