import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuariosFalsos } from '../data/UsuariosFalsos';
import Header from '../components/Header';
import '../styles/login.css';

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = usuariosFalsos.find(
      (u) => u.usuario === usuario && u.senha === senha
    );

    if (user) {
      localStorage.setItem('usuarioLogado', JSON.stringify(user));
      navigate('/');
    } else {
      setErro('Usuário ou senha inválidos');
    }
  };

  return (
    <>
      <Header />
      <main className="login-container">
        <div className="login-card">
          <h2>Entrar</h2>

          <label>
            Usuário
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite seu usuário"
            />
          </label>

          <label>
            Senha
            <div className="senha-wrapper">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                className="toggle-olho"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? '🙈' : '👁️'}
              </button>
            </div>
          </label>

          <a href="#" className="esqueci-senha">
            Esqueci minha senha
          </a>

          {erro && <p className="erro-login">{erro}</p>}

          <button className="btn-entrar" onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </main>
    </>
  );
};

export default Login;
