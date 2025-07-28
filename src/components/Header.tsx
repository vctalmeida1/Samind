import { useState, useEffect } from 'react';
import '../styles/header.css';
import { Link } from "react-router-dom";

const Header = () => {
  const [buscarAtivo, setBuscarAtivo] = useState(false);
  const [buscaTexto, setBuscaTexto] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
  const temaSalvo = localStorage.getItem('tema');
  return temaSalvo === 'dark';
});
useEffect(() => {
  document.body.className = darkMode ? 'dark' : '';
  localStorage.setItem('tema', darkMode ? 'dark' : 'light');
}, [darkMode]);
  const toggleTheme = () => setDarkMode((prev) => !prev);
  const wip = () => alert('Em construção!');

  return (
    <>
      <div className="topbar">
        <Link to="/" className="logo">Samind</Link>
        <div className="top-actions">
          {buscarAtivo ? (
            <input
              type="text"
              className="input-inline"
              placeholder="Buscar..."
              value={buscaTexto}
              onChange={(e) => setBuscaTexto(e.target.value)}
              onBlur={() => setBuscarAtivo(false)}
              autoFocus
             />
           ) : (
            <span className="buscar" onClick={() => setBuscarAtivo(true)}>
               🔍 Buscar
            </span>
           )}
          <Link className="login" to="/login">👤</Link>
        </div>
      </div>

      <div className="sub-barra">
        <div className="menu-esquerda">
          <Link to="/materias">Matérias</Link>
          <Link to="/professores">Professores</Link>
          <span onClick={wip}>Boletim</span>
        </div>
          <div className="menu-direita">
            <button onClick={toggleTheme} className="theme-toggle">
              {darkMode ? '☀️' : '🌙'}
            </button>
          <Link className='ajuda' to="/ajuda">Ajuda</Link>
        </div>
      </div>
    </>
  );
};

export default Header;

