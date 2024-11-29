import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/home/home';
import CadastroGerente from './page/CadastroGerente/CadastroGerente';
import Login from './page/LoginGerente/LoginGerente';
import MapaReciclagem  from './components/MapaReciclagem';
import LoginRecycling from './page/logirecycling/loginRecycling';
import RecyclingCadastro from './page/recycling/recyclingCadastro';
import User from './page/use/User';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User/>} />
        <Route path="/login-reciclador" element={<LoginRecycling/>} />
        <Route path="/cadastro-reciclador" element={<RecyclingCadastro/>} />
        <Route path="/cadastro-gerente" element={<CadastroGerente />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mapa-reciclagem" element={<MapaReciclagem />} />
      </Routes>
    </Router>
  );
}

export default App;
