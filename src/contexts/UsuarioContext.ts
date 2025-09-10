// src/contexts/UsuarioContext.ts
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Tipos do usuário
export type TipoUsuario = 'aluno' | 'professor' | null;

export interface Usuario {
  id: number;
  nome: string;
  sobrenome?: string;
  email: string;
  ra?: string; // para aluno
  rf?: string; // para professor
}

// Interface do contexto
interface UsuarioContextProps {
  usuario: Usuario | null;
  tipoUsuario: TipoUsuario;
  login: (usuario: Usuario, tipo: TipoUsuario) => void;
  logout: () => void;
  atualizarUsuario: (dados: Partial<Usuario>) => void;
}

// Criação do contexto
const UsuarioContext = createContext<UsuarioContextProps | undefined>(undefined);

// Props do Provider
interface UsuarioProviderProps {
  children: ReactNode;
}

// Provider sem JSX explícito
export function UsuarioProvider({ children }: UsuarioProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>(null);

  const login = (novoUsuario: Usuario, tipo: TipoUsuario) => {
    setUsuario(novoUsuario);
    setTipoUsuario(tipo);
  };

  const logout = () => {
    setUsuario(null);
    setTipoUsuario(null);
  };

  const atualizarUsuario = (dados: Partial<Usuario>) => {
    if (usuario) {
      setUsuario({ ...usuario, ...dados });
    }
  };

  return React.createElement(
    UsuarioContext.Provider,
    { value: { usuario, tipoUsuario, login, logout, atualizarUsuario } },
    children
  );
}

// Hook para usar o contexto
export function useUsuario(): UsuarioContextProps {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error('useUsuario deve ser usado dentro de um UsuarioProvider');
  }
  return context;
}
