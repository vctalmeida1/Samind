import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/login.css';
import { useUsuario } from '../contexts/UsuarioContext';
import type { Usuario } from '../contexts/UsuarioContext';

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    usuario: {
      id: number;
      nome: string;
      email: string;
      role: 'ALUNO' | 'PROFESSOR';
      createdAt: string;
      updatedAt: string;
      senha?: string; // não vamos usar, mas pode vir
    };
    token: string;
  };
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUsuario();

  const handleLogin = async () => {
    setLoading(true);
    setErro('');
    try {
      const res = await fetch('https://samind-back.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (!res.ok) {
        let msg = 'Erro ao fazer login';
        try {
          const errData: { message?: string } = await res.json();
          if (errData.message) msg = errData.message;
        } catch {
          msg = 'Erro inesperado no servidor';
        }
        throw new Error(msg);
      }

      const data: LoginResponse = await res.json();

      // mapeia usuário retornado do backend
      const usuarioLogado: Usuario = {
        id: data.data.usuario.id,
        nome: data.data.usuario.nome,
        email: data.data.usuario.email,
        sobrenome: '',
        ra: data.data.usuario.role === 'ALUNO' ? `RA${data.data.usuario.id}` : undefined,
        rf: data.data.usuario.role === 'PROFESSOR' ? `RF${data.data.usuario.id}` : undefined,
      };

      const tipo = data.data.usuario.role === 'ALUNO' ? 'aluno' : 'professor';

      // atualiza contexto
      login(usuarioLogado, tipo);

      // persiste token e usuário
      localStorage.setItem('token', data.data.token);
      localStorage.setItem(
        'usuarioLogado',
        JSON.stringify({
          usuario: usuarioLogado.nome || usuarioLogado.email,
          tipo,
        })
      );

      navigate('/');
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  const irParaRegister = () => navigate('/register');

  return (
    <>
      <Header />
      <main className="login-container">
        <div className="login-card">
          <h2>Entrar</h2>

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

          <a href="#" className="esqueci-senha">Esqueci minha senha</a>

          {erro && <p className="erro-login">{erro}</p>}

          <div className="botoes-login">
            <button className="btn-entrar" onClick={handleLogin} disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
            <button className="btn-registrar" onClick={irParaRegister} disabled={loading}>
              Registrar
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
