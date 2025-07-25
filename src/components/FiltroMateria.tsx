import React from 'react';
import '../styles/filtroMateria.css';

const materias = [
  'Matemática',
  'Português',
  'História',
  'Física',
  'Lógica de programação',
  'Modelagem de banco de dados',
  'Back-end',
  'Front-end',
];

type FiltroMateriaProps = {
  filtrosSelecionados: string[];
  toggleFiltro: (materia: string) => void;
};

const FiltroMateria: React.FC<FiltroMateriaProps> = ({ filtrosSelecionados, toggleFiltro }) => {
  return (
    <div className="filtro-container">
      <h3>Filtrar por Matéria</h3>
      <div className="botoes-filtro">
        {materias.map((materia) => (
          <button
            key={materia}
            className={filtrosSelecionados.includes(materia) ? 'ativo' : ''}
            onClick={() => toggleFiltro(materia)}
          >
            {materia}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FiltroMateria;
