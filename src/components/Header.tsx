import { useState, useEffect } from 'react';
import '../styles/header.css';
import { Link, useNavigate } from "react-router-dom";

type Usuario = {
  tipo: 'aluno' | 'professor';
  usuario: string;
};

const Header = () => {
  const [buscarAtivo, setBuscarAtivo] = useState(false);
  const [buscaTexto, setBuscaTexto] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const temaSalvo = localStorage.getItem('tema');
    return temaSalvo === 'dark';
  });

  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
    localStorage.setItem('tema', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      setUsuarioLogado(JSON.parse(usuario));
    }
  }, []);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const logout = () => {
  localStorage.removeItem('usuarioLogado');
  setUsuarioLogado(null);
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

          {usuarioLogado ? (
           <div className="menu-usuario">
              <button
                className="btn-usuario"
                onClick={() => setMenuAberto(!menuAberto)}
              >
                {usuarioLogado.usuario} ⌄
              </button>

              {menuAberto && (
                <div className="dropdown-menu">
                  <button onClick={() => { navigate('/dados'); setMenuAberto(false); }}>
                    Dados Pessoais
                  </button>
                  <button onClick={logout}>Encerrar sessão</button>
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
           {usuarioLogado?.tipo === 'aluno' && (
            <Link to="/boletim">Boletim</Link>
            )}
           {usuarioLogado?.tipo === 'professor' && (
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
