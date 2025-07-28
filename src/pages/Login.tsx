import { useState } from 'react';
import Header from '../components/Header';
import "../styles/login.css"

const Login: React.FC = () => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <>
      <Header />
      <main className="login-container">
        <div className="login-card">
          <h2>Entrar</h2>
          <label>
            Usuário
            <input type="text" placeholder="Digite seu usuário" />
          </label>

          <label>
            Senha
            <div className="senha-wrapper">
              <input
                type={mostrarSenha ? 'text' : 'password'}
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

          <a className="esqueci-senha">
            Esqueci minha senha
          </a>

          <button className="btn-entrar">Entrar</button>
        </div>
      </main>
    </>
  );
};

export default Login;
