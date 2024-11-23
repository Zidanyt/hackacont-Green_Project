import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/home/home';
import CadastroGerente from './page/CadastroGerente/CadastroGerente';
import Login from './page/LoginGerente/LoginGerente';
import MapaReciclagem  from './components/MapaReciclagem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro-gerente" element={<CadastroGerente />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mapa-reciclagem" element={<MapaReciclagem />} />
      </Routes>
    </Router>
  );
}

export default App;
