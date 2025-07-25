import { useState } from 'react';
import '../styles/global.css';

type ChatProps = {
  onClose?: () => void;
};

type Mensagem = {
  autor: string;
  texto: string;
};

const Chat = ({ onClose }: ChatProps) => {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { autor: 'Amigo1', texto: 'Opa, um ordem depois da aula?' },
    { autor: 'Você', texto: 'Claro!' },
  ]);

  const [novaMsg, setNovaMsg] = useState('');

  const enviarMensagem = () => {
    if (!novaMsg.trim()) return;

    setMensagens((prev) => [...prev, { autor: 'Você', texto: novaMsg }]);
    setNovaMsg('');
  };

  return (
    <div className="chat-flutuante">
      <div className="chat-header">
        <strong>Mensagens</strong>
        <button className='button-chat' onClick={onClose}>✖</button>
      </div>

      <div className="chat-mensagens">
        {mensagens.map((msg, i) => (
          <div
            key={i}
            className={`mensagem ${msg.autor === 'Você' ? 'voce' : 'amigo'}`}
          >
            <strong>{msg.autor}:</strong> <span>{msg.texto}</span>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={novaMsg}
          onChange={(e) => setNovaMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()}
        />
        <button onClick={enviarMensagem}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;

{/* <li
            onClick={() => setMensagemAberta((prev) => !prev)}
            className={mensagemAberta ? 'ativo' : ''}>✉️ Mensagens</li> */}

// {mensagemAberta && <Chat onClose={() => setMensagemAberta(false)} />}
// const [mensagemAberta, setMensagemAberta] = useState(false);
// import Chat from '../components/Chat';