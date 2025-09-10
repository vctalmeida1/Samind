// src/components/ModalRespostas.tsx
import React, { useState } from 'react';
import type { Pergunta } from '../pages/Home';

interface Resposta {
  id: number;
  texto: string;
  usuario: {
    id: number;
    nome: string;
  };
}

interface ModalRespostasProps {
  pergunta: Pergunta;
  onClose: () => void;
  usuarioLogado: { usuario: { id: number; nome: string }; tipo: string } | null;
}

const ModalRespostas: React.FC<ModalRespostasProps> = ({ pergunta, onClose, usuarioLogado }) => {
  const [respostaTexto, setRespostaTexto] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [respostas, setRespostas] = useState<Resposta[]>(pergunta.respostas || []);

  const enviarResposta = async () => {
    if (!usuarioLogado) {
      alert('Você precisa estar logado para responder');
      return;
    }
    if (!respostaTexto.trim()) return;

    setEnviando(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token não encontrado, faça login novamente');
        setEnviando(false);
        return;
      }

      const body = {
        texto: respostaTexto,
        perguntaId: pergunta.id,
      };

      const res = await fetch('https://samind-back.onrender.com/respostas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Erro ao enviar resposta');

      const novaResposta: Resposta = await res.json();

      setRespostas((prev) => [...prev, novaResposta]);
      setRespostaTexto('');
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar resposta');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="modal-respostas-backdrop">
      <div className="modal-respostas">
        <button className="fechar-modal" onClick={onClose}>
          ✖
        </button>

        <h3>{pergunta.titulo}</h3>
        <p>{pergunta.descricao}</p>

        <div className="respostas-lista">
          {respostas.length === 0 ? (
            <p>Nenhuma resposta ainda.</p>
          ) : (
            respostas.map((r) => (
              <div key={r.id} className="resposta-item">
                <strong>{r.usuario.nome}:</strong> {r.texto}
              </div>
            ))
          )}
        </div>

        {usuarioLogado ? (
          <div className="responder-area">
            <textarea
              placeholder="Responda essa pergunta"
              value={respostaTexto}
              onChange={(e) => setRespostaTexto(e.target.value)}
              disabled={enviando}
            />
            <button onClick={enviarResposta} disabled={enviando}>
              {enviando ? 'Enviando...' : 'Responder'}
            </button>
          </div>
        ) : (
          <p className="alerta-login">Você precisa estar logado para responder</p>
        )}
      </div>
    </div>
  );
};

export default ModalRespostas;
