import React from 'react';
import Header from '../components/Header';
import '../styles/materias.css';
import { Link } from 'react-router-dom';

const materias = [
  { nome: 'Matemática', imagem: '/imgs/matematica.png' },
  { nome: 'Português', imagem: '/imgs/portugues.png' },
  { nome: 'História', imagem: '/imgs/historia.png' },
  { nome: 'Física', imagem: '/imgs/fisica.png' },
  { nome: 'Lógica', imagem: '/imgs/logica.png' },
  { nome: 'Front-end', imagem: '/imgs/front-end.png' },
  { nome: 'Back-end', imagem: '/imgs/back-end.png' },
  { nome: 'Modelagem', imagem: '/imgs/modelagem.png' },
];

const Materias: React.FC = () => {
  return (
    <>
      <Header />
      <div className="materias-container">
        {materias.map((materia) => (
          <Link to="#" key={materia.nome} className="card-materia" style={{ backgroundImage: `url(${materia.imagem})` }}>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Materias;
