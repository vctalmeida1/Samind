import React, { useEffect, useState } from 'react';
import ModalMateria from '../components/ModalMateria';
import ModalRespostas from '../components/ModalRespostas.tsx'; // modal de respostas
import Header from '../components/Header';
import FiltroMateria from '../components/FiltroMateria';
import { FiSearch } from 'react-icons/fi';

export interface Pergunta {
  id: number;
  titulo: string;
  descricao: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
  };
  respostas?: { id: number; texto: string; usuario: { id: number; nome: string } }[];
}

const Home: React.FC = () => {
  const [pergunta, setPergunta] = useState('');
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [modalAtivo, setModalAtivo] = useState(false);
  const [modalRespostas, setModalRespostas] = useState<Pergunta | null>(null);
  const [filtros, setFiltros] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  const usuarioLogado = (() => {
    const u = localStorage.getItem('usuarioLogado');
    return u ? JSON.parse(u) : null;
  })();

  // GET perguntas
  useEffect(() => {
    setLoading(true);
    fetch('https://samind-back.onrender.com/perguntas')
      .then((res) => res.json())
      .then((data) => setPerguntas(data))
      .catch((err) => {
        console.error('Erro ao buscar perguntas:', err);
        setErro('Erro ao carregar perguntas');
      })
      .finally(() => setLoading(false));
  }, []);

  const enviarPergunta = () => {
    if (!usuarioLogado) {
      alert('Você precisa estar logado para enviar perguntas');
      return;
    }
    if (!pergunta.trim()) return;
    setModalAtivo(true);
  };

  const toggleFiltro = (materia: string) => {
    setFiltros((prev) =>
      prev.includes(materia) ? prev.filter((m) => m !== materia) : [...prev, materia]
    );
  };

  const perguntasFiltradas = perguntas.filter(
    (p) => filtros.length === 0 || filtros.includes(p.titulo)
  );

  const handleMateriaSelecionada = async (materia: string) => {
    try {
      setEnviando(true);
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token não encontrado, faça login novamente');
        return;
      }

      const novaPergunta = { titulo: materia, descricao: pergunta };

      const res = await fetch('https://samind-back.onrender.com/perguntas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(novaPergunta),
      });

      if (!res.ok) throw new Error('Erro ao enviar pergunta');

      const criada: Pergunta = await res.json();

      setPerguntas((prev) => [criada, ...prev]);
      setPergunta('');
      setModalAtivo(false);
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar pergunta');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container">
        <section className="content">
          <div className="pergunta-input-wrapper">
            <input
              className="pergunta-input"
              placeholder="Qual a dúvida de hoje?"
              value={pergunta}
              onChange={(e) => setPergunta(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && enviarPergunta()}
              disabled={enviando}
            />
            <FiSearch
              className="icone-lupa"
              onClick={enviarPergunta}
            />
          </div>

          {modalAtivo && (
            <ModalMateria
              onSelect={handleMateriaSelecionada}
              onClose={() => setModalAtivo(false)}
            />
          )}

          {enviando && <p>Enviando pergunta...</p>}

          {loading ? (
            <p>Carregando perguntas...</p>
          ) : erro ? (
            <p>{erro}</p>
          ) : (
            <div className="cards-container">
              {perguntasFiltradas.map((p) => (
                <div key={p.id} className="card-pergunta">
                  <div className="user-icon">👤</div>
                  <div className="pergunta-texto">
                    <strong>{p.usuario.nome}</strong>
                    <br />
                    <small>({p.titulo})</small>
                    <br />
                    <p>{p.descricao}</p>
                    <button
                      onClick={() => setModalRespostas(p)}
                      className="btn-respostas"
                    >
                      {p.respostas?.length ?? 0} Resposta(s)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {modalRespostas && (
            <ModalRespostas
              pergunta={modalRespostas}
              onClose={() => setModalRespostas(null)}
              usuarioLogado={usuarioLogado}
            />
          )}
        </section>
        <aside>
          <FiltroMateria filtrosSelecionados={filtros} toggleFiltro={toggleFiltro} />
        </aside>
      </main>
    </>
  );
};

export default Home;
