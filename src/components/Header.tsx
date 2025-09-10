// src/components/Header.tsx
import { useState, useEffect } from 'react';
import '../styles/header.css';
import { Link, useNavigate } from "react-router-dom";
import { useUsuario } from '../contexts/UsuarioContext';

const Header = () => {
  const [buscarAtivo, setBuscarAtivo] = useState(false);
  const [buscaTexto, setBuscaTexto] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const temaSalvo = localStorage.getItem('tema');
    return temaSalvo === 'dark';
  });
  const [menuAberto, setMenuAberto] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();
  const { usuario, tipoUsuario, logout } = useUsuario();

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
    localStorage.setItem('tema', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    if (usuario) {
      setLoginSuccess(true);
      const timer = setTimeout(() => setLoginSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [usuario]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const handleLogout = () => {
    // limpa localStorage
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('token');

    // limpa contexto
    logout();

    // fecha menu e redireciona
    setMenuAberto(false);
    navigate('/');
  };

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

          {usuario ? (
            <div className="menu-usuario">
              <button
                className="btn-usuario"
                onClick={() => setMenuAberto(!menuAberto)}
              >
                {usuario.nome} {loginSuccess && <span className="login-ok">✅</span>} ⌄
              </button>

              {menuAberto && (
                <div className="dropdown-menu">
                  <button onClick={() => { navigate('/dados'); setMenuAberto(false); }}>
                    Dados Pessoais
                  </button>
                  <button onClick={handleLogout}>
                    Encerrar sessão
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className="login" to="/login">👤</Link>
          )}
        </div>
      </div>

      <div className="sub-barra">
        <div className="menu-esquerda">
          <Link to="/materias">Matérias</Link>
          <Link to="/professores">Professores</Link>
          {tipoUsuario === 'aluno' && (
            <Link to="/boletim">Boletim</Link>
          )}
          {tipoUsuario === 'professor' && (
            <Link to="/lancar-notas">Lançar Notas</Link>
          )}
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
