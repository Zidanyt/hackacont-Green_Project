import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

import style from './cadastroGerente.module.css'

function CadastroGerente() {
  const [formData, setFormData] = useState({
    nome: '',
    gmail: '',
    senha: '',
    repetirSenha: '',
    cnpj: '',
    localizacao: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
  };

  return (
    <div className={style.container}>
      <div>
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
            <TextField
              fullWidth
              label="Localização"
              name="localizacao"
              value={formData.localizacao}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => window.location.href = '/login'}
            >
              Entrar
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
}

export default CadastroGerente;
