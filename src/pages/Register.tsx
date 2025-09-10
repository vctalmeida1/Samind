import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/login.css';
import { useUsuario } from '../contexts/UsuarioContext';
import type { Usuario } from '../contexts/UsuarioContext';

const Register: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUsuario();

  const handleRegister = async () => {
    setLoading(true);
    setErro('');
    try {
      const res = await fetch('https://samind-back.onrender.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Erro ao registrar');
      }

      const data: { usuario: Usuario; token: string } = await res.json();

      // Atualiza contexto
      login(data.usuario, 'aluno');

      // Salva token
      localStorage.setItem('token', data.token);

      // Redireciona para Home
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro('Erro inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="login-container">
        <div className="login-card">
          <h2>Registrar</h2>

          <label>
            Nome
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome completo"
            />
          </label>

          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
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

          {erro && <p className="erro-login">{erro}</p>}

          <div className="botoes-login">
            <button className="btn-entrar" onClick={handleRegister} disabled={loading}>
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
