import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Modal, Typography } from '@mui/material';
import style from './home.module.css';

function Home() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={style.home_container}>
      <div className={style.top_links}>
        <Link className={style.link_} to="/fale-com-agente">fale-com-agente</Link>
        <Link className={style.link_} to="/user">entrar</Link>
      </div>
      <span className={style.texto}>
        <p>Não desperdice seus vegetais e frutas. 
        Faça uma doação para reciclagem.</p>
      </span>
      <div className={style.center_link}>
        <Button className={style.button} variant="contained" color="primary" onClick={handleOpen}>
          se-cadastrar
        </Button>
      </div>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            backgroundColor: '#559D43',
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography id="modal-description" sx={{ mt: 2, mb: 3, color: 'white' }}>
          Ficamos felizes por você querer ajudar o meio ambiente! 😊 Mas, antes de prosseguir, poderia nos informar se você é gerente de algum mercado ou um reciclador
          </Typography>
          <Box display="flex" justifyContent="space-between" gap={2}>
            <Button variant="contained" color="success" fullWidth onClick={() => window.location.href = '/cadastro-gerente'}>
              Gerente
            </Button>
            <Button variant="contained" color="success" fullWidth onClick={() => window.location.href = '/cadastro-reciclador'}>
              Reciclador
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
