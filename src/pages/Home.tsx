import React from 'react';
import { useState } from 'react';
import ModalMateria from '../components/ModalMateria';
import Header from '../components/Header';
import FiltroMateria from '../components/FiltroMateria';

const Home: React.FC = () => {
  const [pergunta, setPergunta] = useState('');
  const [perguntas, setPerguntas] = useState<
    { usuario: string; materia: string; texto: string }[]
  >([]);
  const [modalAtivo, setModalAtivo] = useState(false);
  const [filtros, setFiltros] = useState<string[]>([]);
  const enviarPergunta = () => {
  if (!pergunta.trim()) return;
  setModalAtivo(true);
};
const toggleFiltro = (materia: string) => {
  setFiltros((prev) =>
    prev.includes(materia) ? prev.filter((m) => m !== materia) : [...prev, materia]
  );
};
const perguntasFiltradas = perguntas.filter((p) =>
  filtros.length === 0 || filtros.includes(p.materia)
);
const handleMateriaSelecionada = (materia: string) => {
  const novaPergunta = {
    usuario: 'Davi',
    materia,
    texto: pergunta,
  };
  setPerguntas((prev) => [novaPergunta, ...prev]);
  setPergunta('');
  setModalAtivo(false);
};

  return (
    <>
    <Header />
      <main className="container">
        <section className="content">
          <input
            className="pergunta-input"
            placeholder="Qual a dúvida de hoje?"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enviarPergunta()}
          />
          {modalAtivo && (
            <ModalMateria
              onSelect={handleMateriaSelecionada}
              onClose={() => setModalAtivo(false)}
            />
          )}

          <div className="cards-container">
            {perguntasFiltradas.map((p, i) => (
              <div key={i} className="card-pergunta">
                <div className="user-icon">👤</div>
                <div className="pergunta-texto">
                  <strong>{p.usuario}</strong><br />
                  <small>({p.materia})</small><br />
                  <p>{p.texto}</p>
                  <button onClick={() => alert('Ainda sem respostas')}>
                    0 Resposta
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <aside>
          <FiltroMateria
            filtrosSelecionados={filtros}
            toggleFiltro={toggleFiltro}
          />
        </aside>
      </main>
    </>
  );
};

export default Home;
