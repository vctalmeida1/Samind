import React, { useState } from 'react';
import Header from '../components/Header';
import defaultUser from '../assets/default-user.png';
import '../styles/dados.css'

interface Usuario {
  tipo: 'aluno' | 'professor';
  nome: string;
  sobrenome: string;
  email: string;
  raOuRf: string;
  foto?: string;
}

const Dados: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario>({
    tipo: 'aluno',
    nome: 'Davi',
    sobrenome: 'Almeida',
    email: 'dava@email.com',
    raOuRf: '654321',
    foto: '',
  });

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUsuario({ ...usuario, foto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Header />
      <div className="dados-container">
        <h2>Dados Pessoais</h2>

        <div className="foto-upload">
          <img src={usuario.foto || defaultUser} alt="Foto de perfil" />
          <input type="file" accept="image/*" onChange={handleFotoChange} />
        </div>

        <div className="campos">
          <label>Nome:</label>
          <input value={usuario.nome} onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })} />

          <label>Sobrenome:</label>
          <input value={usuario.sobrenome} onChange={(e) => setUsuario({ ...usuario, sobrenome: e.target.value })} />

          <label>{usuario.tipo === 'aluno' ? 'RA' : 'RF'}:</label>
          <input value={usuario.raOuRf} onChange={(e) => setUsuario({ ...usuario, raOuRf: e.target.value })} />

          <label>Email:</label>
          <input type="email" value={usuario.email} onChange={(e) => setUsuario({ ...usuario, email: e.target.value })} />

          <button className="alterar-senha">Alterar Senha</button>
        </div>
      </div>
    </>
  );
};

export default Dados;
