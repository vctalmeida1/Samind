import React from 'react';
import '../styles/global.css';

type ModalMateriaProps = {
  onSelect: (materia: string) => void;
  onClose: () => void;
};

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

const ModalMateria: React.FC<ModalMateriaProps> = ({ onSelect, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-materia">
        <h3>Escolha a matéria</h3>
        <ul>
          {materias.map((materia) => (
            <li key={materia} onClick={() => onSelect(materia)}>
              {materia}
            </li>
          ))}
        </ul>
        <button className="fechar-modal" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default ModalMateria;
